"use server";

import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

const badgeTypes = ["ROCK", "SILVER", "GOLD"] as const;

type BadgeType = (typeof badgeTypes)[number];

export default async function setPostBadge(postId: string, type: BadgeType) {
  const session = await getSession();

  if (!session?.user?.email) return { message: "Nie jesteś zalogowany!" };

  if (!postId || !type || !badgeTypes.includes(type))
    return { message: "Nie podano id lub typu!" };

  const cost = {
    ROCK: 100,
    SILVER: 400,
    GOLD: 1000,
  };

  try {
    const selectedType = type.toUpperCase() as BadgeType;

    const badgeIsExist = await prisma.badgePost.count({
      where: {
        type: selectedType,
        postId,
        authorId: session.user.id,
      },
    });

    if (badgeIsExist) {
      return { result: "ALREADY_EXIST" };
    } else {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: session.user.id,
        },
        select: {
          id: true,
          coins: true,
        },
      });

      if (cost[selectedType] > user.coins)
        return { result: "NOT_ENOUGHT_COINS" };

      const badge = await prisma.badgePost.create({
        data: {
          type: selectedType,
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
              tags: true,
              category: {
                include: {
                  parent: true,
                },
              },
            },
          },
        },
      });

      const updateCoins = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coins: {
            decrement: cost[selectedType],
          },
        },
        select: {
          coins: true,
        },
      });

      const count = await prisma.badgePost.count({
        where: {
          postId,
          type: selectedType,
        },
      });

      revalidatePath(`/obr/${badge.post.id}/${badge.post.slug}`);
      revalidatePath(`/${badge.post.category.slug}`);
      if (badge.post.category.parent) {
        revalidatePath(`/${badge.post.category.parent.slug}`);
      }
      if (badge.post.accepted) {
        revalidatePath("/");
      } else {
        revalidatePath("/oczekujace");
      }

      revalidatePath("/ulubione");

      revalidatePath(`/${badge.post.author.username}`);

      badge.post.tags.forEach((tag) => {
        revalidatePath(`/tag/${tag.id}/${tag.slug}`);
      });

      return {
        result: "OK",
        type: badge.type,
        count,
        coins: updateCoins,
      };
    }
  } catch (err: any) {
    return { message: "Wystąpił błąd!" };
  }
}