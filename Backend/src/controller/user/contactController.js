import prisma from "../../../PrismaClient.js";
import { contactSchema } from "../../validators/contactSchema.js";

export const contactUser = async (req, res) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((err) => {
      const fieldName = err.path[0];
      fieldErrors[fieldName] = err.message;
    });

    return res.status(400).json({
      success: false,
      errors: fieldErrors,
    });
  }

  try {
    const contact = await prisma.contact.create({
      data: result.data,
    });

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
