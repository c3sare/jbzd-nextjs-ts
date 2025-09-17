import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

type RequestParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RequestParams) {
  const { id } = await params;
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  if (id !== session.user.id)
    return new NextResponse("You can't delete another user!", { status: 500 });

  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) return new NextResponse("Can't delete user!", { status: 500 });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
