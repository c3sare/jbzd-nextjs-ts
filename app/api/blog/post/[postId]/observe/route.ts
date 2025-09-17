import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { ObservedBlogPost } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    postId: string;
  }>;
};

export async function POST(request: NextRequest, { params }: Params) {
  const { postId } = await params;

  if (!postId) return new NextResponse("No postId provided", { status: 400 });

  try {
    const session = await getSession();

    if (!session?.user) return new NextResponse("No auth", { status: 403 });

    const isExist = await prisma.observedBlogPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.user.id,
        },
      },
    });

    let observe: ObservedBlogPost;

    if (!isExist)
      observe = await prisma.observedBlogPost.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    else
      observe = await prisma.observedBlogPost.delete({
        where: {
          postId_userId: {
            postId,
            userId: session.user.id,
          },
        },
      });

    return NextResponse.json({
      ...observe,
      isObserved: !isExist,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
