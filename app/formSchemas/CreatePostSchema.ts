import { z } from "zod";

const memTypes = ["IMAGE-GIF", "VIDEO", "TEXT", "YOUTUBE"] as const;

const CreatePostSchema = z.object({
  title: z.string(),
  tags: z.array(
    z.object({
      value: z.string(),
    })
  ),
  category: z.string(),
  memContainers: z.array(
    z.object({
      type: z.enum(memTypes),
      data: z.any(),
    })
  ),
  isActiveLinking: z.boolean(),
  link: z.string().url(),
});

export default CreatePostSchema;

export type CreatePostType = z.infer<typeof CreatePostSchema>;
