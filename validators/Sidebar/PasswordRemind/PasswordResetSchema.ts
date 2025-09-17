import { z } from "zod";

const TOO_LONG_PWD = "Hasło jest za długie! (max 32 znaki)";
const TOO_SHORT_PWD = "Hasło jest za krótkie! (min 8 znaków)";
const EMPTY_FIELD = "Pole nie może być puste!";

const PasswordResetSchema = z
  .object({
    email: z.email("E-mail jest nieprawidłowy!"),
    token: z.string(),
    password: z.string(EMPTY_FIELD).min(8, TOO_SHORT_PWD).max(32, TOO_LONG_PWD),
    repassword: z
      .string(EMPTY_FIELD)
      .min(8, TOO_SHORT_PWD)
      .max(32, TOO_LONG_PWD),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Hasła muszą być identyczne!",
    path: ["reNewPassword"],
  });

export default PasswordResetSchema;

export type PasswordResetType = z.infer<typeof PasswordResetSchema>;
