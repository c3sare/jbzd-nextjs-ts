"use server";

import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

export default async function setPostVote(postId: string) {
  const session = await getSession();

  if (!session?.user?.email) return { message: "No authorization" };

  if (!postId) return { message: "Brak id posta!" };

  try {
    const voteIsExist = await prisma.postVote.findFirst({
      where: {
        postId,
        authorId: session.user.id,
      },
    });
    let vote;

    if (voteIsExist) {
      vote = await prisma.postVote.delete({
        where: {
          id: voteIsExist.id,
        },
        include: {
          post: {
            include: {
              category: {
                include: {
                  parent: true,
                },
              },
              tags: true,
              author: true,
            },
          },
        },
      });
    } else {
      vote = await prisma.postVote.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          author: {
            connect: {
              id: session.user.id,
            },
          },
        },
        include: {
          post: {
            include: {
              category: {
                include: {
                  parent: true,
                },
              },
              tags: true,
              author: true,
            },
          },
        },
      });
    }

    const count = await prisma.postVote.count({
      where: {
        postId,
      },
    });

    revalidatePath("/", "layout");

    return { isPlused: !Boolean(voteIsExist), count };
  } catch (err: any) {
    return { message: "Internal Error" };
  }
}
