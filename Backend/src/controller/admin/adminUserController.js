import prisma from "../../../PrismaClient.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        dotNumber: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        role: true,
        companyName: true,
      },
      orderBy: {
        dotNumber: "asc",
      },
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, companyName } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        firstName,
        lastName,
        phone,
        companyName,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User update successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const specificUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userWithOrders = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          select: {
            amount: true,
            status: true,
            createdAt: true,

            course: {
              select: {
                title: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!userWithOrders) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetch Successful",
      data: userWithOrders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCoursePurchases = async (req, res) => {
  const { id } = req.params;
  try {
    const purchases = await prisma.order.findMany({
      where: {
        courseId: parseInt(id),
      },
      select: {
        amount: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: purchases,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
