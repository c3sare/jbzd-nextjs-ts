import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const imageType = z
  .any()
  .refine((file: File) => file, "Pole nie może być puste!")
  .refine(
    (file: File) => file?.size <= MAX_FILE_SIZE,
    `Maksymalny rozmiar pliku to 5MB.`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Obsługiwane rozszerzenia to .jpg, .jpeg, .png .gif"
  );

const memTypes = ["IMAGE", "VIDEO", "TEXT", "YOUTUBE"] as const;

const CreatePostSchema = z
  .object({
    title: z
      .string({ required_error: "Pole tytuł jest wymagane." })
      .nonempty("Pole tytuł jest wymagane."),
    tags: z.array(
      z.object({
        value: z.string(),
      })
    ),
    category: z
      .string({ required_error: "Pole dział jest wymagane." })
      .nonempty("Pole dział jest wymagane."),
    memContainers: z
      .array(
        z.object({
          type: z.enum(memTypes),
          data: z
            .string({ required_error: "Pole nie może być puste" })
            .nonempty("Pole nie może być puste!")
            .or(imageType),
        })
      )
      .min(1, "Pole typ jest wymagane."),
    linking: z.object({
      isActive: z.boolean().refine((val) => typeof val === "boolean"),
      url: z
        .string({ required_error: "Pole link jest wymagane!" })
        .refine((val) => {
          try {
            return Boolean(new URL(val));
          } catch {
            return "Pole link jest wymagane!";
          }
        })
        .optional(),
      image: z.any().optional(),
    }),
  })
  .refine(
    (obj) => {
      if (obj.linking.isActive) {
        const link = obj.linking.url;
        if (link) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    {
      message: "Pole link jest wymagane!",
      path: ["linking"],
    }
  );

export default CreatePostSchema;

export type CreatePostType = z.infer<typeof CreatePostSchema>;
