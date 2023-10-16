import { z } from "zod";

const TOO_LONG_VALUE = "Wartość nie może być dłuższa niż 32 znaków";
const TOO_SHORT_VALUE = "Minimalna ilość znaków to 8!";
const REQUIRED_FIELD = "To pole jest wymagane!";

const LoginSchema = z.object({
  login: z
    .string({ required_error: REQUIRED_FIELD })
    .min(8, TOO_SHORT_VALUE)
    .max(20, TOO_LONG_VALUE)
    .regex(
      /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      "Nieprawidłowa nazwa użytkownika!"
    ),
  password: z
    .string({ required_error: REQUIRED_FIELD })
    .min(8, TOO_SHORT_VALUE)
    .max(20, TOO_LONG_VALUE),
});

export default LoginSchema;

export type LoginType = z.infer<typeof LoginSchema>;
