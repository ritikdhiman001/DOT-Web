import prisma from "../../../PrismaClient.js";
import bcrypt from "bcrypt";
import { loginSchema } from "../../validators/loginSchema.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const result = loginSchema.safeParse(req.body);

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

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: { email: "Email not registerd" },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        errors: { password: "Incorrect password" },
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const { password: _, ...userData } = user;
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};
