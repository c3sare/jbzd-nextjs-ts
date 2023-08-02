import getSession from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const { method, id }: { method: "BLOCK" | "FOLLOW"; id: string } =
      await request.json();

    if (!["BLOCK", "FOLLOW"].includes(method))
      return new NextResponse("Invalid method type", { status: 400 });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user)
      return new NextResponse("User from session not found", { status: 404 });

    if (id === user.id)
      return new NextResponse("Can't observe you own profile!", {
        status: 500,
      });

    const userAction = await prisma.userAction.create({
      data: {
        method,
        user: {
          connect: {
            id,
          },
        },
        author: { connect: { id: user.id } },
      },
      include: {
        user: {
          select: {
            actionedUsers: true,
            actionedByUsers: true,
          },
        },
      },
    });

    return NextResponse.json({ ...userAction });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
