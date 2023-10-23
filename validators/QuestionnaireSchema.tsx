import { z } from "zod";

const QuestionnaireSchema = z.object({
  question: z
    .string({ required_error: "Pole pytanie jest wymagane!" })
    .trim()
    .min(3, "Pole musi się składać z min. 3 znaków!")
    .max(80, "Pole nie może się składać z więcej niż 80 znaków!"),
  answers: z
    .object({
      value: z
        .string()
        .trim()
        .min(3, "Pole musi się składać z min. 3 znaków!")
        .max(50, "Pole nie może się składać z więcej niż 50 znaków!"),
    })
    .array()
    .min(2, "Wprowadź przynajmniej 2 odpowiedzi!")
    .max(20, "Nie może być więcej niż 20 odpowiedzi!"),
  markOption: z.enum(["single", "multiple"]),
  availableTime: z.enum(["", "1d", "3d", "7d"]),
});

export default QuestionnaireSchema;
