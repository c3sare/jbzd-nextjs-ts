"use server";

import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import revalidatePosts from "@/utils/revalidatePosts";
import { FavouritePost } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function setFavouritePost(postId: string) {
  const session = await getSession();

  if (!session?.user?.email) return { message: "Nie jesteś zalogowany!" };

  if (!postId) return { message: "Nie podano id artykułu!" };

  try {
    const favouriteIsExist = await prisma.favouritePost.findFirst({
      where: {
        postId,
        authorId: session.user.id,
      },
    });
    let favourite;

    if (favouriteIsExist) {
      favourite = await prisma.favouritePost.delete({
        where: {
          id: favouriteIsExist.id,
        },
        include: {
          post: {
            include: {
              author: true,
              category: {
                include: {
                  parent: true,
                },
              },
              tags: true,
            },
          },
        },
      });
    } else {
      favourite = await prisma.favouritePost.create({
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
              author: true,
              category: {
                include: {
                  parent: true,
                },
              },
              tags: true,
            },
          },
        },
      });
    }

    revalidatePosts(favourite.post);

    return { isFavourite: !Boolean(favouriteIsExist) };
  } catch (err: any) {
    return { message: "Wystąpił problem!" };
  }
}
