import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getSession } from "@/actions/getSession";
import { BlogPostVote, User } from "@prisma/client";

type BlogPostVoteParams = {
  params: Promise<{
    postId: string;
  }>;
};

export async function POST(req: Request, { params }: BlogPostVoteParams) {
  try {
    const { postId } = await params;

    const { method } = await req.json();

    if (!method || !["PLUS", "MINUS"].includes(method))
      return new NextResponse("Internal error", { status: 400 });

    const session = await getSession();

    if (!session?.user?.id) return new NextResponse("No auth", { status: 403 });

    const userId = session.user.id;

    const currentVote = await prisma.blogPostVote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    let vote:
      | (BlogPostVote & {
          user: Pick<User, "id" | "username" | "image">;
        })
      | null = null;

    if (currentVote?.method !== method || !currentVote) {
      vote = await prisma.blogPostVote.upsert({
        where: {
          userId_postId: { userId, postId },
        },
        update: {
          method,
        },
        create: {
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
          method,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      });
    } else {
      await prisma.blogPostVote.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    const votes = await prisma.blogPostVote.findMany({
      where: {
        postId,
      },
    });

    const plusVotesCount = votes.filter(
      (item) => item.method === "PLUS"
    ).length;
    const minusVotesCount = votes.filter(
      (item) => item.method === "MINUS"
    ).length;

    const score = plusVotesCount - minusVotesCount;

    const voteMethod =
      votes.find((item) => item.userId === userId)?.method || "";

    return NextResponse.json({ score, method: voteMethod, vote });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
