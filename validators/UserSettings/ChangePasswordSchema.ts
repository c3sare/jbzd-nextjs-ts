import { z } from "zod";

const TOO_LONG_PWD = "Hasło jest za długie! (max 32 znaki)";
const TOO_SHORT_PWD = "Hasło jest za krótkie! (min 8 znaków)";
const EMPTY_FIELD = "Pole nie może być puste!";

const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: EMPTY_FIELD,
      })
      .min(8, TOO_SHORT_PWD),
    newPassword: z
      .string({
        required_error: EMPTY_FIELD,
      })
      .min(8, TOO_SHORT_PWD)
      .max(32, TOO_LONG_PWD),
    reNewPassword: z
      .string({
        required_error: EMPTY_FIELD,
      })
      .min(8, TOO_SHORT_PWD),
  })
  .refine((data) => data.newPassword === data.reNewPassword, {
    message: "Hasła muszą być identyczne!",
    path: ["reNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Nowe hasło nie może być takie jak stare!",
    path: ["newPassword"],
  });

export default ChangePasswordSchema;

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
