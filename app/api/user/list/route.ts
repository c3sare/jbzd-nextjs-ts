import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.id) return NextResponse.json([]);

    const { text } = await request.json();

    if (!text) return NextResponse.json([]);

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: text,
        },
        NOT: {
          username: session.user.username,
        },
      },
      select: {
        id: true,
        username: true,
        image: true,
      },
      take: 15,
    });

    return NextResponse.json(users);
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
