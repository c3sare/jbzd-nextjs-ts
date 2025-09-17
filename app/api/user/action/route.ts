import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { UserAction } from "@prisma/client";
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

    if (id === session.user.id)
      return new NextResponse("Can't observe you own profile!", {
        status: 500,
      });

    const isActioned = await prisma.userAction.findFirst({
      where: {
        userId: id,
        authorId: session.user.id,
      },
    });

    if (isActioned) {
      await prisma.userAction.delete({
        where: {
          id: isActioned.id,
        },
      });
    }

    if ((isActioned as unknown as UserAction)?.method !== method) {
      const userAction = await prisma.userAction.create({
        data: {
          method,
          user: {
            connect: {
              id,
            },
          },
          userRanking: {
            connect: {
              id,
            },
          },
          author: { connect: { id: session.user.id } },
        },
      });
      return NextResponse.json({ method: userAction.method });
    }

    return NextResponse.json({ method: "" });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
