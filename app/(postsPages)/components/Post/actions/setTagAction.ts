"use server";

import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { TagAction } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function setTagAction(
  id: string,
  method: "BLOCK" | "FOLLOW"
) {
  try {
    const session = await getSession();

    if (!session?.user?.email) return { message: "Nie jesteś zalogowany!" };

    const isActioned = await prisma.tagAction.findFirst({
      where: {
        tagId: id,
        authorId: session.user.id,
      },
    });

    if (isActioned) {
      const tagAction = await prisma.tagAction.delete({
        where: {
          id: isActioned.id,
        },
        include: {
          tag: {
            include: {
              posts: true,
            },
          },
        },
      });

      tagAction.tag.posts.forEach((post) => {
        revalidatePath(`/obr/${post.id}/${post.slug}`);
      });
    }
    let currentMethod = "";
    if ((isActioned as unknown as TagAction)?.method !== method) {
      const tagAction = await prisma.tagAction.create({
        data: {
          method,
          tag: {
            connect: {
              id,
            },
          },
          author: { connect: { id: session.user.id } },
        },
        include: {
          tag: {
            include: {
              posts: true,
            },
          },
        },
      });
      tagAction.tag.posts.forEach((post) => {
        revalidatePath(`/obr/${post.id}/${post.slug}`);
      });

      currentMethod = tagAction.method;
    }

    return { method: currentMethod };
  } catch (err: any) {
    return { message: "Wystąpił problem" };
  }
}
