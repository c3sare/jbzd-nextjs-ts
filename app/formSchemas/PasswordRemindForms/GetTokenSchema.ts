import { z } from "zod";

const GetTokenSchema = z.object({
  email: z
    .string({ required_error: "Uzupełnij adres e-mail!" })
    .email("E-mail jest nieprawidłowy!"),
});

export default GetTokenSchema;

export type GetTokenType = z.infer<typeof GetTokenSchema>;
