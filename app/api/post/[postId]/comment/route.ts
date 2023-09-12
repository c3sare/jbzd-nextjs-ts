import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

type RequestParams = {
  params: {
    postId: string;
  };
};

export async function POST(
  request: Request,
  { params: { postId } }: RequestParams
) {
  if (!postId)
    return new NextResponse("No id provided or type is invalid", {
      status: 400,
    });

  const { text, commentId } = await request.json();

  if (!text) return new NextResponse("No authorization", { status: 403 });

  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: session.user.id,
        postId,
        content: text,
        precedentId: commentId,
      },
    });

    return NextResponse.json({ id: comment.id });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
