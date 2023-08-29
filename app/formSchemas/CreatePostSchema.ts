import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

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
        z
          .object({
            type: z.enum(memTypes),
            data: z.any(),
          })
          .refine((val) => {
            if (["TEXT", "YOUTUBE"].includes(val.type)) {
              const value = val.data as string;
              if (value && value.length > 0) {
                return true;
              } else return false;
            } else if (["VIDEO", "IMAGE"].includes(val.type)) {
              const file = val.data as File | null;
              if (!file) {
                return "Pole nie może być puste!";
              }
              if (file?.size > MAX_FILE_SIZE) {
                return "Maksymalny rozmiar pliku to 5MB.";
              }
              if (val.type === "IMAGE") {
                if (!ACCEPTED_IMAGE_TYPES.includes(file.type))
                  return "Obsługiwane rozszerzenia to .jpg, .jpeg, .png .gif";
              } else if (val.type === "VIDEO") {
                if (!["video/mp4"].includes(file.type)) {
                  return "Obsługiwane rozszerzenie to .mp4";
                }
              }
            }
            return true;
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
