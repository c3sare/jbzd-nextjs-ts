import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 403 });

    const { phrase } = await req.json();

    if (!phrase)
      return NextResponse.json({
        status: "success",
        users: [],
      });

    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: phrase,
        },
      },
      take: 10,
    });

    return NextResponse.json({
      status: "success",
      users,
    });
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
