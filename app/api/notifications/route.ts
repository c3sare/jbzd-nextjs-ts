import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 500 });

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        addTime: "desc",
      },
      select: {
        id: true,
        addTime: true,
        type: true,
        seen: true,
        author: {
          select: {
            username: true,
          },
        },
        post: {
          select: {
            id: true,
            slug: true,
            title: true,
            memContainers: true,
          },
        },
        commentId: true,
      },
      take: 5,
    });

    return NextResponse.json(notifications);
  } catch {
    return new NextResponse("Internal error", { status: 500 });
  }
}
