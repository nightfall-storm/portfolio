import { z } from "zod";

export const contactSchema = z.object({
  email: z
    .string()
    .min(1, { message: "IDENTIFIER_REQUIRED" })
    .email({ message: "INVALID_SIGNAL_FORMAT" }),
  subject: z
    .string()
    .min(3, { message: "HEADER_TOO_SHORT" })
    .max(100, { message: "HEADER_OVERFLOW" })
    .transform((val) => val.toUpperCase()),
  message: z
    .string()
    .min(10, { message: "BODY_UNDERFLOW" })
    .max(2000, { message: "BUFFER_OVERFLOW" })
    .transform((val) => val.toUpperCase()),
});
