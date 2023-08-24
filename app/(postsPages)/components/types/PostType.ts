import { PostStats } from "@prisma/client";

export type PostType = Omit<PostStats, "author" | "tags"> & {
  isFavourite?: boolean;
  isPlused?: boolean;
  author?: PostStats["author"] & {
    action?: "BLOCK" | "FOLLOW" | "";
  };
  tags: PostStats["tags"][0] &
    {
      action?: "BLOCK" | "FOLLOW" | "";
    }[];
};
