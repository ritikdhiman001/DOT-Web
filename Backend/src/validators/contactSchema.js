import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name length Minimum should be 3")
    .max(20, "Name length Maximum should be 20"),
  email: z.string().email("Email is required and Enter correct Email"),
  company: z.string().optional(),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  subject: z.string().min(5, "Subject length Minimum should be 5"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
