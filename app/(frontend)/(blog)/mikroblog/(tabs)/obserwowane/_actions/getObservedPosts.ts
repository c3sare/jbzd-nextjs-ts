import { getIncludePostData } from "../../../_utils/getIncludePostData";
import prisma from "@/libs/prismadb";
import { transformPosts } from "../../_actions/getPosts";

export async function getObservedPosts(userId: string, cursor?: string) {
  const observed = await prisma.observedBlogPost.findMany({
    where: {
      userId,
    },
    include: {
      post: {
        include: getIncludePostData(userId),
      },
    },
    orderBy: {
      addTime: "desc",
    },
    cursor: cursor
      ? {
          postId_userId: {
            userId,
            postId: cursor,
          },
        }
      : undefined,
    skip: cursor ? 1 : 0,
    take: 10,
  });

  const posts = observed.map((obs) => obs.post);

  return transformPosts(posts, userId);
}
