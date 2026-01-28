import prisma from "../../../PrismaClient.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses] = await prisma.$transaction([
      prisma.user.count(),
      prisma.course.count(),
    ]);
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
