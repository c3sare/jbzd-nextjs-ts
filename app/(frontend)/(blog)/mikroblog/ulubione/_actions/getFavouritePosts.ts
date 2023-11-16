import prisma from "@/libs/prismadb";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { transformPosts } from "../../(tabs)/_actions/getPosts";

export async function getFavouritePosts(userId: string, cursor?: string) {
  const favourite = await prisma.favouriteBlogPost.findMany({
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

  const posts = favourite.map((fav) => fav.post);

  return transformPosts(posts, userId);
}
