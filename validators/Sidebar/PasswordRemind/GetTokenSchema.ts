import { z } from "zod";

const GetTokenSchema = z.object({
  email: z.email("E-mail jest nieprawidłowy!"),
});

export default GetTokenSchema;

export type GetTokenType = z.infer<typeof GetTokenSchema>;
