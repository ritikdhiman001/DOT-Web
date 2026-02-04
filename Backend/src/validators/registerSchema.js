import { z } from "zod";

export const registerSchema = z.object({
  dotNumber: z.string().max(10, "Invaild DOT Number"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Enter a Vaild Email address "),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  companyName: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});
