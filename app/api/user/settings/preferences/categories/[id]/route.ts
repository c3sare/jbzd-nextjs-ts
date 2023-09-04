import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

type RequestParams = {
  params: {
    id: string;
  };
};

export async function DELETE(
  _request: Request,
  { params: { id } }: RequestParams
) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const categoryAction = await prisma.categoryAction.delete({
      where: {
        id,
        author: {
          email: session.user.email,
        },
      },
    });

    return NextResponse.json(categoryAction);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
