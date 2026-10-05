import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "CALLSIGN_REQUIRED" })
    .max(100, { message: "CALLSIGN_OVERFLOW" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "IDENTIFIER_REQUIRED" })
    .email({ message: "INVALID_SIGNAL_FORMAT" }),
  subject: z
    .string()
    .trim()
    .min(3, { message: "HEADER_TOO_SHORT" })
    .max(100, { message: "HEADER_OVERFLOW" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "BODY_UNDERFLOW" })
    .max(2000, { message: "BUFFER_OVERFLOW" }),
});

export type ContactFormState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    form?: string[];
  };
};
