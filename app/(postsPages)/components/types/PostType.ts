import { PostStats } from "@prisma/client";

export type PostType = Omit<PostStats, "author" | "tags" | "authorId"> & {
  isFavourite?: boolean;
  isPlused?: boolean;
  authorId?: string;
  author?: PostStats["author"] & {
    action?: "BLOCK" | "FOLLOW" | "";
  };
  tags: (PostStats["tags"][0] & {
    action?: "BLOCK" | "FOLLOW" | "";
  })[];
};
