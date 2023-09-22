import { getSession } from "@/app/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getMessages from "@/app/actions/chat/getMessages";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 400 });

    const { userId }: { userId: string } = await request.json();

    if (!userId || typeof userId !== "string")
      return new NextResponse("Bad request params!", { status: 400 });

    const conversation =
      (await prisma.conversation.findUnique({
        where: {
          userIds: [session.user.id, userId],
        },
      })) ||
      (await prisma.conversation.findUnique({
        where: {
          userIds: [userId, session.user.id],
        },
      }));

    if (conversation) return NextResponse.json(conversation);

    const newConversation = await prisma.conversation.create({
      data: {
        userIds: [session.user.id, userId],
      },
    });

    return NextResponse.json(newConversation);
  } catch {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 403 });

    const conversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: session.user.id,
        },
        NOT: {
          messagesIds: {
            isEmpty: true,
          },
        },
      },
      include: {
        users: {
          where: {
            id: {
              not: session.user.id,
            },
          },
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        messages: {
          orderBy: {
            addTime: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        lastMessageAt: "asc",
      },
      take: 3,
    });

    return NextResponse.json(conversations);
  } catch (err: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
