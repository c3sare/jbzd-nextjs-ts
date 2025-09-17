import prisma from "@/libs/prismadb";
import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";

type RequestParams = {
  params: Promise<{
    postId: string;
  }>;
};

export async function DELETE(request: Request, { params }: RequestParams) {
  try {
    const { postId } = await params;
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    if (!postId) return new NextResponse("No id provided", { status: 400 });

    const post = await prisma.post.delete({
      where: {
        id: postId,
        authorId: session.user.id,
      },
    });

    if (!post) return new NextResponse("Can't delete post!", { status: 500 });

    return NextResponse.json(post);
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
