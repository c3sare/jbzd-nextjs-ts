import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { PostVote } from "@prisma/client";

type RequestParams = {
  params: Promise<{
    postId: string;
  }>;
};

export async function POST(request: Request, { params }: RequestParams) {
  const { postId } = await params;
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  if (!postId) return new NextResponse("No id provided", { status: 400 });

  try {
    const voteIsExist = await prisma.postVote.findFirst({
      where: {
        postId,
        authorId: session.user.id,
      },
    });
    let vote: PostVote;

    if (voteIsExist) {
      vote = await prisma.postVote.delete({
        where: {
          id: voteIsExist.id,
        },
      });
    } else {
      vote = await prisma.postVote.create({
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
      });
    }

    const count = await prisma.postVote.count({
      where: {
        postId,
      },
    });

    return NextResponse.json({ isPlused: !Boolean(voteIsExist), count });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
