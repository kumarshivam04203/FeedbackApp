import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "username must be at least 3 characters")
  .max(20, "username cannot exceed 20 characters")
  .regex(/^[a-zA-Z0-9_]{5,15}$/, { message: "Username is not valid" });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Email is not a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
