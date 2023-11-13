import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { getIncludePostData } from "../../../_utils/getIncludePostData";

type TVote = "" | "PLUS" | "MINUS";

export const getLatestBlogPostsQuery = async (userId: string) => {
  return await prisma.blogPost.findMany({
    where: {
      NOT: {
        parentId: {
          isSet: true,
        },
      },
    },
    include: getIncludePostData(userId),
    orderBy: {
      addTime: "desc",
    },
    take: 10,
  });
};

export async function getLatestBlogPosts() {
  try {
    const session = await getSession();

    if (!session?.user?.id) return [];

    const posts = await getLatestBlogPostsQuery(session.user.id);

    return posts.map((post) => ({
      ...post,
      votes: post.votes.filter((vote) => vote.userId !== session.user!.id),
      score:
        post.votes.filter((item) => item.method === "PLUS").length -
        post.votes.filter((item) => item.method === "MINUS").length,
      method: (post.votes.find((vote) => vote.userId === session.user!.id)
        ?.method || "") as TVote,
      isFavourite: post._count.favouriteBy === 1,
      isObserved: post._count.observedBy === 1,
      children: post.children.map((child) => ({
        ...child,
        score:
          child.votes.filter((item) => item.method === "PLUS").length -
          child.votes.filter((item) => item.method === "MINUS").length,
        votes: child.votes.filter((vote) => vote.userId !== session.user!.id),
        method: (child.votes.find((vote) => vote.userId === session.user!.id)
          ?.method || "") as TVote,
      })),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}
