import { z } from "zod";

const RemindEmailSchema = z.object({
  email: z
    .string({ required_error: "Uzupełnij adres e-mail!" })
    .email("E-mail jest nieprawidłowy!"),
});

export default RemindEmailSchema;

export type RemindEmailType = z.infer<typeof RemindEmailSchema>;
