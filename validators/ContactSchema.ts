import { z } from "zod";
import namePattern from "@/components/regex/namePattern";

const TOO_LONG_VALUE = "Wartość nie może być dłuższa niż 25 znaków";
const INCORRECT_FIELD_VALUE = "Nie prawidłowo uzupełnione pole!";
const TOO_LONG_MESSAGE = "Wartość nie może być dłuższa niż 500 znaków!";

const ContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, INCORRECT_FIELD_VALUE)
    .max(25, TOO_LONG_VALUE)
    .regex(namePattern, INCORRECT_FIELD_VALUE)
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, INCORRECT_FIELD_VALUE)
    .max(25, TOO_LONG_VALUE)
    .regex(namePattern, INCORRECT_FIELD_VALUE)
    .optional(),
  email: z.string().email(INCORRECT_FIELD_VALUE),
  phone: z
    .string()
    .trim()
    .min(1, INCORRECT_FIELD_VALUE)
    .max(15, INCORRECT_FIELD_VALUE),
  message: z.string().min(1, INCORRECT_FIELD_VALUE).max(500, TOO_LONG_MESSAGE),
});

export default ContactSchema;

export type ContactType = z.infer<typeof ContactSchema>;
