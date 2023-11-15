import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { Prisma } from "@prisma/client";

type GetPostsArgs = {
  where?: Prisma.BlogPostWhereInput;
  orderBy?: Prisma.BlogPostOrderByWithRelationInput;
  take?: number;
  skip?: number;
  cursor?: Prisma.BlogPostWhereUniqueInput;
};

async function getPostsDB(
  { where, orderBy, take, skip, cursor }: GetPostsArgs,
  userId: string
) {
  const blockedTags = await prisma.actionedBlogTag.findMany({
    where: {
      userId,
      method: "BLOCK",
    },
  });

  const blockedTagIds = blockedTags.map((tag) => tag.tagId);

  const posts = await prisma.blogPost.findMany({
    where: {
      NOT: {
        parentId: {
          isSet: true,
        },
        tags: {
          some: {
            id: { in: blockedTagIds },
          },
        },
      },
      ...where,
    },
    include: getIncludePostData(userId),
    orderBy: orderBy || {
      addTime: "desc",
    },
    cursor,
    skip,
    take: take || 10,
  });

  return posts;
}

type TVote = "" | "PLUS" | "MINUS";

type Post = Awaited<ReturnType<typeof getPostsDB>>[number];

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

export async function getPosts(args: GetPostsArgs) {
  const session = await getSession();

  if (!session?.user) return [];

  const userId = session.user.id;

  const posts = await getPostsDB(args, userId);

  return transformPosts(posts, userId);
}
