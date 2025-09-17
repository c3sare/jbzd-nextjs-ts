import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

type RequestParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: RequestParams) {
  const { id } = await params;
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user)
      return new NextResponse("User from session not found", { status: 404 });

    const toVoteUserExist = await prisma.user.count({
      where: {
        id,
      },
    });

    if (!toVoteUserExist)
      return new NextResponse("User to vote not found", { status: 404 });

    if (id === user.id)
      return new NextResponse("You cant vote on your self!", { status: 500 });

    const voted = await prisma.userVote.count({
      where: {
        userId: id,
        authorId: user.id,
      },
    });

    if (!voted) {
      await prisma.userVote.create({
        data: {
          userId: id,
          authorId: user.id,
        },
      });
    } else {
      await prisma.userVote.deleteMany({
        where: {
          userId: id,
          authorId: user.id,
        },
      });
    }

    const count = await prisma.userVote.count({
      where: {
        userId: id,
      },
    });

    return NextResponse.json({ count });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
