import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

type RequestParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RequestParams) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const tagAction = await prisma.tagAction.delete({
      where: {
        id,
        author: {
          email: session.user.email,
        },
      },
    });

    return NextResponse.json(tagAction);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
