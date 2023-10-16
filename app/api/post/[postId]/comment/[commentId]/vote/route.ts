import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

type RequestParams = {
  params: {
    postId: string;
    commentId: string;
  };
};

type VoteType = "plus" | "minus";

type VoteModelType = PrismaClient<PrismaClientOptions>["commentVotePlus"];

export async function POST(
  request: Request,
  { params: { postId, commentId } }: RequestParams
) {
  if (!postId || !commentId)
    return new NextResponse("No id provided or type is invalid", {
      status: 400,
    });

  const { type }: { type: VoteType } = await request.json();

  if (!type || !["plus", "minus"].includes(type))
    return new NextResponse("No authorization", { status: 403 });

  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const voteModel = {
      plus: prisma.commentVotePlus as unknown as VoteModelType,
      minus: prisma.commentVoteMinus as unknown as VoteModelType,
    };

    const exist = await voteModel[type].findFirst({
      where: {
        authorId: session.user.id,
        commentId: commentId,
      },
    });

    await voteModel[type === "plus" ? "minus" : "plus"].deleteMany({
      where: {
        authorId: session.user.id,
        commentId: commentId,
      },
    });

    if (!exist) {
      const vote = await voteModel[type].create({
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
          commentStats: {
            connect: {
              id: commentId,
            },
          },
        },
      });

      const countPlus = await voteModel["plus"].count({
        where: {
          commentId,
        },
      });

      const countMinus = await voteModel["minus"].count({
        where: {
          commentId,
        },
      });

      return NextResponse.json({
        voted: Boolean(vote),
        count: countPlus - countMinus,
        type,
      });
    } else if (exist) {
      const vote = await voteModel[type].delete({
        where: {
          id: exist.id,
        },
      });

      const countPlus = await voteModel["plus"].count({
        where: {
          commentId,
        },
      });

      const countMinus = await voteModel["minus"].count({
        where: {
          commentId,
        },
      });

      return NextResponse.json({
        voted: Boolean(vote),
        count: countPlus - countMinus,
        type: "",
      });
    }
  } catch (err: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
