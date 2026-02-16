import express from "express";
import prisma from "../../PrismaClient.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";

const router = express.Router();

router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    if (course.type === "FREE" || course.price === 0) {
      const already = await prisma.order.findUnique({
        where: {
          userId_courseId: { userId, courseId: course.id },
        },
      });

      if (!already) {
        await prisma.order.create({
          data: {
            userId,
            courseId: course.id,
            amount: 0,
            status: "PAID",
          },
        });
      }
      return res.json({
        free: true,
        message: "Enrolled Successfully",
      });
    }

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: "course_" + Date.now(),
    });

    res.json({ order, course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    const userId = req.user.userId;

    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });

    const already = await prisma.order.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: Number(courseId),
        },
      },
    });

    if (already) {
      return res.json({ success: true, message: "Already Purchased" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        courseId: Number(courseId),
        amount: course.price,
        status: "PAID",
        razorpayOrderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
    });

    res.json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
