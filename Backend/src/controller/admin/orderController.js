import prisma from "../../../PrismaClient.js";

export const buyCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID is required" });
    }

    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not Found",
      });
    }

    const alreadyBought = await prisma.order.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: Number(courseId),
        },
      },
    });

    if (alreadyBought) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        courseId: Number(courseId),
        amount: course.price,
        status: "PAID",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Course Purchases Successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const order = await prisma.order.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
