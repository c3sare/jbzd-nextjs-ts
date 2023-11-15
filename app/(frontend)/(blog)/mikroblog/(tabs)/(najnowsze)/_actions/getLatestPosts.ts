"use server";

import { getPosts } from "../../_actions/getPosts";

export async function getLatestPosts(lastPostId: string | undefined) {
  const posts = await getPosts({
    cursor: lastPostId
      ? {
          id: lastPostId,
        }
      : undefined,
    skip: lastPostId ? 1 : undefined,
  });

  return posts;
}
