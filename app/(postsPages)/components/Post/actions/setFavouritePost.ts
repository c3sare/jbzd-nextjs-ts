"use server";

import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
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

    revalidatePath("/ulubione");
    revalidatePath(`/uzytkownik/${favourite.post.author.username}`);

    revalidatePath("/obserwowane/dzialy");
    revalidatePath("/obserwowane/uzytkownicy");

    revalidatePath(`/${favourite.post.category.slug}`);

    if (favourite.post.category.parent)
      revalidatePath(`/${favourite.post.category.parent.slug}`);

    if (favourite.post.accepted) {
      revalidatePath("/");
    } else {
      revalidatePath("/oczekujace");
    }

    favourite.post.tags.forEach((tag) => {
      revalidatePath(`/tag/${tag.id}/${tag.slug}`);
    });

    return { isFavourite: !Boolean(favouriteIsExist) };
  } catch (err: any) {
    return { message: "Wystąpił problem!" };
  }
}
