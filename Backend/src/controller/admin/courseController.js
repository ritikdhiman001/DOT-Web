import prisma from "../../../PrismaClient.js";
export const addCourse = async (req, res) => {
  try {
    const { title, description, price, type, image } = req.body;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Course Image is required",
      });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: Number(price),
        type,
        image,
      },
    });

    res.status(201).json({
      success: true,
      message: "Course Added Successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Course Delete Successfull",
      data: course,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, type, price, image } = req.body;

  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        type,
        price: Number(price),
        ...(image && { image }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
