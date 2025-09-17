import { z } from "zod";
import { convert } from "html-to-text";

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
      .string("Pole tytuł jest wymagane.")
      .trim()
      .min(1, "Pole dział jest wymagane."),
    tags: z.array(
      z.object({
        value: z.string(),
      })
    ),
    category: z
      .string("Pole dział jest wymagane.")
      .min(1, "Pole dział jest wymagane."),
    memContainers: z
      .array(
        z
          .object({
            type: z.enum(memTypes),
            data: z.any(),
          })
          .refine(
            (val) => {
              if (val.type === "TEXT") {
                const content = convert(val.data);

                return content.length >= 10;
              } else return true;
            },
            { message: "To pole musi mieć conajmniej 10 znaków!" }
          )
          .refine(
            (val) => {
              if (val.type === "YOUTUBE") {
                const value = val.data as string;

                return value?.length > 0;
              } else return true;
            },
            {
              message: "Pole nie może być puste!",
            }
          )
          .refine(
            (val) => {
              if (["VIDEO", "IMAGE"].includes(val.type)) {
                const file = val.data as File | null;

                return Boolean(file);
              }
              return true;
            },
            {
              message: "Pole nie może być puste!",
            }
          )
          .refine(
            (val) => {
              if (["VIDEO", "IMAGE"].includes(val.type)) {
                const file = val.data as File | null;
                if (!file) return false;

                if (file.size > MAX_FILE_SIZE) {
                  return false;
                }
              }
              return true;
            },
            {
              message: "Maksymalny rozmiar pliku to 5MB.",
            }
          )
          .refine(
            (val) => {
              if (val.type === "IMAGE") {
                const file = val.data as File | null;
                if (!file) return false;

                if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;
              }
              return true;
            },
            {
              message: "Obsługiwane rozszerzenia to .jpg, .jpeg, .png .gif",
            }
          )
          .refine(
            (val) => {
              if (val.type === "VIDEO") {
                const file = val.data as File | null;
                if (!file) return false;

                if (!["video/mp4"].includes(file.type)) return false;
              }
              return true;
            },
            {
              message: "Obsługiwane rozszerzenie to .mp4",
            }
          )
      )
      .min(1, "Pole typ jest wymagane."),
    linking: z.object({
      isActive: z.boolean().refine((val) => typeof val === "boolean"),
      url: z
        .string("Pole link jest wymagane!")
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
