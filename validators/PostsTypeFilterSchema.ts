import { z } from "zod";

const PostsTypeFilterSchema = z.object({
  pharse: z.string(),
  video: z.boolean(),
  gif: z.boolean(),
  image: z.boolean(),
  text: z.boolean(),
});

export default PostsTypeFilterSchema;

export type PostsTypeFilterType = z.infer<typeof PostsTypeFilterSchema>;
