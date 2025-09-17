import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

type PostMessageConversationParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: NextRequest,
  { params }: PostMessageConversationParams
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No autorization", { status: 500 });

    const { body } = await request.json();

    if (!body) return new NextResponse("Body is invalid", { status: 400 });

    const message = await prisma.message.create({
      data: {
        body,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        conversation: {
          connect: {
            id,
          },
        },
        seen: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    const updateConversation = await prisma.conversation.update({
      where: {
        id,
        OR: [
          {
            userBlockedId: {
              isSet: false,
            },
          },
          {
            userBlockedId: null,
          },
        ],
      },
      data: {
        lastMessageAt: message.addTime,
        messagesIds: {
          push: message.id,
        },
      },
      select: {
        id: true,
        lastMessageAt: true,
        userIds: true,
        users: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        messages: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            addTime: "desc",
          },
          take: 1,
        },
      },
    });

    if (!message) return new NextResponse("Internal error", { status: 500 });

    await Promise.all(
      updateConversation.userIds.map(async (userId) => {
        await pusherServer.trigger(userId, "message:new", updateConversation);
      })
    );

    return NextResponse.json(updateConversation);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
