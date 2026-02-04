import prisma from "../../../PrismaClient.js";

export const addBlog = async (req, res) => {
  try {
    const { tag, title, description, author, duration } = req.body;

    const blog = await prisma.blog.create({
      data: {
        tag,
        title,
        description,
        author,
        duration,
      },
    });
    res.status(201).json({
      success: true,
      message: "Blog Add Successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogData = await prisma.blog.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json({ success: true, data: blogData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Blog Delete Successfully",
      data: deleteBlog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog is not Delete",
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, tag, duration } = req.body;
  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        author,
        tag,
        duration,
      },
    });
    res.status(200).json({
      success: true,
      message: "Blog Update Successfull",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
