import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import addNotification from "@/app/actions/addNotification";

type BadgeType = "ROCK" | "SILVER" | "GOLD";

type RequestParams = {
  params: {
    postId: string;
    type: "rock" | "silver" | "gold";
  };
};

export async function POST(
  request: Request,
  { params: { postId, type } }: RequestParams
) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  if (!postId || !type || !["rock", "silver", "gold"].includes(type))
    return new NextResponse("No id provided or type is invalid", {
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
      return NextResponse.json({ result: "ALREADY_EXIST" });
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
        return NextResponse.json({ result: "NOT_ENOUGHT_COINS" });

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

      return NextResponse.json({
        result: "OK",
        type: badge.type.toLowerCase(),
        count,
        coins: updateCoins,
      });
    }
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
