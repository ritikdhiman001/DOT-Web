import prisma from "../../../PrismaClient.js";
import bcrypt from "bcrypt";
import { registerSchema } from "../../validators/registerSchema.js";

export const registerUser = async (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    const fieldErrors = {};

    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });

    return res.status(400).json({
      success: false,
      errors: fieldErrors,
    });
  }

  try {
    const { password, ...rest } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
