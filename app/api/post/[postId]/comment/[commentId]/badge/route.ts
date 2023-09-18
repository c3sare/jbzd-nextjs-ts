import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { PrismaClient } from "@prisma/client";
import {
  DefaultArgs,
  PrismaClientOptions,
} from "@prisma/client/runtime/library";

type RequestParams = {
  params: {
    postId: string;
    commentId: string;
  };
};

type BadgeType = "rock" | "silver" | "gold";

const cost = {
  rock: 100,
  silver: 400,
  gold: 1000,
};

export async function POST(
  request: Request,
  { params: { postId, commentId } }: RequestParams
) {
  if (!postId || !commentId)
    return new NextResponse("No id provided or type is invalid", {
      status: 400,
    });

  const { type }: { type: BadgeType } = await request.json();

  if (!type || !["rock", "silver", "gold"].includes(type))
    return new NextResponse("No authorization", { status: 403 });

  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  type BadgeModel = PrismaClient<
    PrismaClientOptions,
    never,
    DefaultArgs
  >["commentRockBadge"];

  try {
    const haveEnoughtCoins = Boolean(
      await prisma.user.findFirst({
        where: {
          id: session.user.id,
          coins: {
            gte: cost[type],
          },
        },
      })
    );

    if (!haveEnoughtCoins) return NextResponse.json({ notEnoughtCoins: true });

    const badgeModel = {
      rock: prisma.commentRockBadge as never as BadgeModel,
      silver: prisma.commentSilverBadge as never as BadgeModel,
      gold: prisma.commentGoldBadge as never as BadgeModel,
    };

    const exist = await badgeModel[type].count({
      where: {
        authorId: session.user.id,
        commentId: commentId,
      },
    });

    if (!exist) {
      const badge = await badgeModel[type].create({
        data: {
          author: {
            connect: {
              id: session.user.id,
            },
          },
          comment: {
            connect: {
              id: commentId,
            },
          },
        },
        include: {
          comment: {
            include: {
              author: true,
              post: true,
            },
          },
        },
      });

      const user = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          coins: {
            decrement: cost[type],
          },
        },
      });

      const { newOrders } = badge.comment.author.notifications!;

      if (newOrders && badge.authorId !== badge.comment.authorId) {
        await prisma.notification.create({
          data: {
            type: "BADGE",
            post: {
              connect: {
                id: badge.comment.postId,
              },
            },
            user: {
              connect: { id: badge.comment.post.authorId },
            },
            comment: {
              connect: {
                id: badge.comment.id,
              },
            },
            author: {
              connect: {
                id: badge.authorId,
              },
            },
          },
        });
      }

      const count = await badgeModel[type].count({
        where: {
          commentId,
        },
      });

      return NextResponse.json({
        badged: Boolean(badge),
        count,
        type,
        coins: user.coins,
      });
    } else {
      return NextResponse.json({ alreadyExist: true });
    }
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
