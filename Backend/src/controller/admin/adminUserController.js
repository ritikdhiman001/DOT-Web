import prisma from "../../../PrismaClient.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
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
        id: Number(id),
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
      where: { id: Number(id) },
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
