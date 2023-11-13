import { getLatestBlogPostsQuery } from "../(tabs)/(najnowsze)/_actions/getLatestBlogPosts";

type TVote = "" | "PLUS" | "MINUS";

type Post = Awaited<ReturnType<typeof getLatestBlogPostsQuery>>[number];

export function transformPosts(posts: Post[], userId: string) {
  return posts.map((post) => ({
    ...post,
    votes: post.votes.filter((vote) => vote.userId !== userId),
    score:
      post.votes.filter((item) => item.method === "PLUS").length -
      post.votes.filter((item) => item.method === "MINUS").length,
    method: (post.votes.find((vote) => vote.userId === userId)?.method ||
      "") as TVote,
    isFavourite: post._count.favouriteBy === 1,
    isObserved: post._count.observedBy === 1,
    children: post.children.map((child) => ({
      ...child,
      score:
        child.votes.filter((item) => item.method === "PLUS").length -
        child.votes.filter((item) => item.method === "MINUS").length,
      votes: child.votes.filter((vote) => vote.userId !== userId),
      method: (child.votes.find((vote) => vote.userId === userId)?.method ||
        "") as TVote,
    })),
  }));
}
