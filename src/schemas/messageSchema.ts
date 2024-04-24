import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long." })
    .max(300, { message: "Content cannot exceed 300 characters in length." }),
});
