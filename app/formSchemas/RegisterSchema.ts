import { z } from "zod";

const TOO_LONG_VALUE = "Wartość nie może być dłuższa niż 32 znaków";
const TOO_SHORT_VALUE = "Minimalna ilość znaków to 8!";
const INCORRECT_FIELD_VALUE = "Nie prawidłowo uzupełnione pole!";
const REQUIRED_FIELD = "To pole jest wymagane!";

const RegisterSchema = z
  .object({
    username: z
      .string({ required_error: REQUIRED_FIELD })
      .min(8, TOO_SHORT_VALUE)
      .max(20, TOO_LONG_VALUE)
      .regex(
        /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Nieprawidłowa nazwa użytkownika!"
      ),
    email: z
      .string({ required_error: REQUIRED_FIELD })
      .email(INCORRECT_FIELD_VALUE),
    password: z
      .string({ required_error: REQUIRED_FIELD })
      .min(8, TOO_SHORT_VALUE)
      .max(20, TOO_LONG_VALUE),
    repassword: z
      .string({ required_error: REQUIRED_FIELD })
      .min(8, TOO_SHORT_VALUE)
      .max(20, TOO_LONG_VALUE),
    rules: z.boolean({ required_error: REQUIRED_FIELD }),
  })
  .refine(
    (data) => data.password === data.repassword,
    "Hasła muszą być identyczne!"
  );

export default RegisterSchema;

export type RegisterType = z.infer<typeof RegisterSchema>;
