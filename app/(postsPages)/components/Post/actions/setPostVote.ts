"use server";

import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
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

    // revalidatePath(`/obr/${vote.post.id}/${vote.post.slug}`);
    // revalidatePath(`/${vote.post.category.slug}`);
    // if (vote.post.category.parent) {
    //   revalidatePath(`/${vote.post.category.parent.slug}`);
    // }
    // if (vote.post.accepted) {
    //   revalidatePath("/");
    // } else {
    //   revalidatePath("/oczekujace");
    // }

    // revalidatePath("/ulubione");

    // revalidatePath(`/${vote.post.author.username}`);

    // vote.post.tags.forEach((tag) => {
    //   revalidatePath(`/tag/${tag.id}/${tag.slug}`);
    // });

    return { isPlused: !Boolean(voteIsExist), count };
  } catch (err: any) {
    return { message: "Internal Error" };
  }
}
