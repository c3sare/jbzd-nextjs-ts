import { z } from "zod";

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
          data: z.any(),
        })
      )
      .min(1, "Pole typ jest wymagane."),
    isActiveLinking: z.boolean().refine((val) => typeof val === "boolean"),
    customPreviewImage: z.custom<FileList>().optional(),
    link: z
      .string({ required_error: "Pole link jest wymagane!" })
      .refine((val) => {
        try {
          return Boolean(new URL(val));
        } catch {
          return "Pole link jest wymagane!";
        }
      })
      .optional(),
  })
  .refine(
    (obj) => {
      if (obj.isActiveLinking) {
        const link = obj.link;
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
      path: ["link"],
    }
  );

export default CreatePostSchema;

export type CreatePostType = z.infer<typeof CreatePostSchema>;
