"use server";

import prisma from "@/app/libs/prismadb";
import { getSession } from "@/app/actions/getSession";

export default async function deletePost(postId: string) {
  try {
    const session = await getSession();

    if (!session?.user?.email) return { message: "Nie jesteś zalogowany!" };

    if (!postId) return { message: "Nie podano id!" };

    const post = await prisma.post.delete({
      where: {
        id: postId,
        authorId: session.user.id,
      },
      include: {
        tags: true,
        category: {
          include: {
            parent: true,
          },
        },
        author: true,
      },
    });

    if (!post) return { message: "Nie można usunąć tego posta!" };

    return { deleted: true };
  } catch (err: any) {
    console.log(err);
    return { message: "Wystąpił problem!" };
  }
}
