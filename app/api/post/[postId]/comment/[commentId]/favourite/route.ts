import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getPremium } from "@/actions/getPremium";

type RequestParams = {
  params: {
    postId: string;
    commentId: string;
  };
};

export async function POST(
  request: Request,
  { params: { postId, commentId } }: RequestParams
) {
  if (!postId || !commentId)
    return new NextResponse("No id provided or type is invalid", {
      status: 400,
    });

  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const { isPremium } = await getPremium();

    if (!isPremium)
      return NextResponse.json({ message: "Musisz posiadać premium!" });

    const isFavourite = await prisma.favouriteComment.findFirst({
      where: {
        authorId: session.user.id,
        commentId,
      },
    });

    if (!isFavourite) {
      const favComment = await prisma.favouriteComment.create({
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
      return NextResponse.json({ isFavourite: Boolean(favComment) });
    } else {
      const favComment = await prisma.favouriteComment.delete({
        where: {
          id: isFavourite.id,
        },
      });
      return NextResponse.json({ isFavourite: !Boolean(favComment) });
    }
  } catch (err: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
