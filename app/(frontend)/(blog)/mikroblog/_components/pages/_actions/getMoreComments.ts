"use server";

import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

type TVote = "" | "PLUS" | "MINUS";

export async function getMoreComments(postId: string, cursor: string) {
  const session = await getSession();

  if (!session?.user?.id) return [];

  const comments = await prisma.blogPost.findMany({
    where: {
      parentId: postId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      votes: {
        include: {
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      addTime: "asc",
    },
    cursor: {
      id: cursor,
    },
    skip: 1,
  });

  return comments.map((comment) => ({
    ...comment,
    votes: comment.votes.filter((vote) => vote.userId !== session.user!.id),
    score:
      comment.votes.filter((item) => item.method === "PLUS").length -
      comment.votes.filter((item) => item.method === "MINUS").length,
    method: (comment.votes.find((vote) => vote.userId === session.user!.id)
      ?.method || "") as TVote,
  }));
}
