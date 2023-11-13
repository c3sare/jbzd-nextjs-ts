import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { FavouriteBlogPost } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    postId: string;
  };
};

export async function POST(
  request: NextRequest,
  { params: { postId } }: Params
) {
  if (!postId) return new NextResponse("No postId provided", { status: 400 });

  try {
    const session = await getSession();

    if (!session?.user) return new NextResponse("No auth", { status: 403 });

    const isExist = await prisma.favouriteBlogPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.user.id,
        },
      },
    });

    let favourite: FavouriteBlogPost;

    if (!isExist)
      favourite = await prisma.favouriteBlogPost.create({
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
      favourite = await prisma.favouriteBlogPost.delete({
        where: {
          postId_userId: {
            postId,
            userId: session.user.id,
          },
        },
      });

    return NextResponse.json({
      ...favourite,
      isFavourite: !isExist,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
