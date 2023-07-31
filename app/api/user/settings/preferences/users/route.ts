import getSession from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const { id } = await request.json();

    const userAction = prisma.userAction.delete({
      where: {
        id,
        author: {
          email: session.user.email,
        },
      },
    });

    return NextResponse.json(userAction);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
