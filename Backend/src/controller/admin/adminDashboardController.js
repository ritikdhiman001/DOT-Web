import jwt from "jsonwebtoken";
import prisma from "../../../PrismaClient.js";
import bcrypt from "bcrypt";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalBlogs] = await prisma.$transaction([
      prisma.user.count(),
      prisma.course.count(),
      prisma.blog.count(),
    ]);
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.user.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin is not found",
      });
    }
    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const matchPass = await bcrypt.compare(password, admin.password);

    if (!matchPass) {
      return res.status(401).json({
        success: false,
        message: "Invaild Credentails",
      });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.ADMIN_JWT_TOKEN,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      message: "Admin Login Successfully",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
