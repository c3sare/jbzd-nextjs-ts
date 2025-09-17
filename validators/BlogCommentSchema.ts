import { z } from "zod";
import { FileType } from "@prisma/client";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const BlogCommentSchema = z.object({
  message: z
    .string("Nieprawidłowo uzupełnione pole!")
    .trim()
    .max(500, "Wpis jest za długi!")
    .min(1, "Pole opis jest wymagane."),
  files: z
    .array(
      z.object({
        type: z.enum(FileType),
        uuid: z.uuid(),
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
              message: "Obsługiwane rozszerzenia to .jpg, .jpeg, .png .gif",
            }
          ),
      })
    )
    .nullable(),
});

export default BlogCommentSchema;
