import { z } from "zod";
import QuestionnaireSchema from "./QuestionnaireSchema";
import { FileType } from "@prisma/client";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "video/mp4",
];

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
  files: z
    .array(
      z.object({
        type: z.nativeEnum(FileType),
        uuid: z.string().uuid(),
        value: z
          .any()
          .refine(
            (val) => {
              const file = val as File | null;

              return Boolean(file);
            },
            {
              message: "Pole nie może być puste!",
            }
          )
          .refine(
            (val) => {
              const file = val as File | null;
              if (!file) return false;

              if (file.size > MAX_FILE_SIZE) {
                return false;
              }
              return true;
            },
            {
              message: "Maksymalny rozmiar pliku to 5MB.",
            }
          )
          .refine(
            (val) => {
              const file = val as File | null;
              if (!file) return false;

              if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;

              return true;
            },
            {
              message:
                "Obsługiwane rozszerzenia to .jpg, .jpeg, .png .gif .mp4",
            }
          ),
      })
    )
    .nullable(),
  questionnaire: z.optional(QuestionnaireSchema),
});

export default BlogPostSchema;
