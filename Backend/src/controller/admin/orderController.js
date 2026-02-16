import prisma from "../../../PrismaClient.js";

export const getOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const order = await prisma.order.findMany({
      where: { userId },
      include: { course: true },
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
