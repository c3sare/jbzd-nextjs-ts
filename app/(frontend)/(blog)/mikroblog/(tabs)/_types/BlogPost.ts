import { getPosts } from "../_actions/getPosts";

export type BlogPostType = Awaited<ReturnType<typeof getPosts>>[number];
