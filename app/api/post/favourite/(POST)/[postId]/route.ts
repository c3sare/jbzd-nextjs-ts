import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

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
    const favouriteIsExist = await prisma.favouritePost.findFirst({
      where: {
        postId,
        authorId: session.user.id,
      },
    });

    if (favouriteIsExist) {
      await prisma.favouritePost.delete({
        where: {
          id: favouriteIsExist.id,
        },
      });
    } else {
      await prisma.favouritePost.create({
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

    return NextResponse.json({ isFavourite: !Boolean(favouriteIsExist) });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
