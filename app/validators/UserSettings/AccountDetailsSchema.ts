import { z } from "zod";
import namePattern from "../../components/regex/namePattern";

const TOO_LONG_VALUE = "Wartość nie może być dłuższa niż 25 znaków";
const INCORRECT_FIELD_VALUE = "Nie prawidłowo uzupełnione pole!";

const AccountDetailsSchema = z.object({
  name: z
    .string()
    .max(25, TOO_LONG_VALUE)
    .regex(namePattern, INCORRECT_FIELD_VALUE)
    .optional(),
  gender: z.number().min(0).max(3).multipleOf(1),
  country: z
    .string()
    .max(25, TOO_LONG_VALUE)
    .regex(namePattern, INCORRECT_FIELD_VALUE)
    .optional(),
  city: z
    .string()
    .max(25, TOO_LONG_VALUE)
    .regex(namePattern, INCORRECT_FIELD_VALUE)
    .optional(),
  birthdate: z.string().datetime({ offset: true }).nullable(),
});

export default AccountDetailsSchema;

export type AccountDetailsType = z.infer<typeof AccountDetailsSchema>;
