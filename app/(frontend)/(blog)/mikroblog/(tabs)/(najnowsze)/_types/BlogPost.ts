import { getLatestBlogPosts } from "../_actions/getLatestBlogPosts";

export type BlogPostType = Awaited<
  ReturnType<typeof getLatestBlogPosts>
>[number];
