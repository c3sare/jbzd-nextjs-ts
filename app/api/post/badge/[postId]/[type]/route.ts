import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import addNotification from "@/actions/addNotification";
import type { NextRequest } from "next/server";

type BadgeType = "ROCK" | "SILVER" | "GOLD";

type RequestParams = {
  params: Promise<{
    postId: string;
    type: string;
  }>;
};

export async function POST(request: NextRequest, { params }: RequestParams) {
  const { postId, type } = await params;
  const session = await getSession();

  if (!session?.user?.email)
    return new Response("No authorization", { status: 403 });

  if (!postId || !type || !["rock", "silver", "gold"].includes(type))
    return new Response("No id provided or type is invalid", {
      status: 400,
    });

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
      return Response.json({ result: "ALREADY_EXIST" });
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
        return Response.json({ result: "NOT_ENOUGHT_COINS" });

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
          author: true,
          post: {
            include: {
              author: true,
            },
          },
        },
      });

      if (
        badge.post.author.notifications?.newOrders &&
        badge.authorId !== badge.post.authorId
      ) {
        await addNotification("BADGE", {
          postId: badge.postId,
          postAuthorId: badge.post.authorId,
        });
      }

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

      return Response.json({
        result: "OK",
        type: badge.type.toLowerCase(),
        count,
        coins: updateCoins,
      });
    }
  } catch (err: any) {
    return new Response("Internal Error", { status: 500 });
  }
}
