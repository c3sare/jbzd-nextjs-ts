import isValidBase64Format from "@/utils/isValidBase64Format";
import { z } from "zod";
import QuestionnaireSchema from "./QuestionnaireSchema";

const BlogPostSchema = z.object({
  message: z
    .string({
      invalid_type_error: "Nieprawidłowo uzupełnione pole!",
      required_error: "Pole opis jest wymagane.",
    })
    .trim()
    .max(500, "Wpis jest za długi!")
    .min(1, "Pole opis jest wymagane."),
  adultContent: z.boolean(),
  files: z.array(
    z.object({
      type: z.enum(["IMAGE", "VIDEO"]),
      value: z.any().refine(
        (val) => {
          if (typeof val === "string") {
            return isValidBase64Format(val);
          } else if (val instanceof File) {
            return true;
          }
          return false;
        },
        { message: "Plik jest nieprawidłowy!" }
      ),
    })
  ),
  questionnaire: z.optional(QuestionnaireSchema),
});

export default BlogPostSchema;
