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
    const { password, dotNumber, email, role, ...rest } = result.data;
    const existingDot = await prisma.user.findUnique({
      where: { dotNumber },
    });

    if (existingDot) {
      return res.status(400).json({
        success: false,
        errors: { dotNumber: "DOT Number already registered" },
      });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        errors: { email: "Email is already registered" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        dotNumber,
        email,
        role: role || "USER",
        ...rest,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
