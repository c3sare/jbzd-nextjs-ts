import { getSession } from "@/app/actions/getSession";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

type PostMessageConversationParams = {
  params: {
    id: string;
  };
};

export async function POST(
  request: NextRequest,
  { params: { id } }: PostMessageConversationParams
) {
  try {
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
      },
      data: {
        lastMessageAt: message.addTime,
        messagesIds: {
          push: message.id,
        },
      },
      include: {
        messages: true,
      },
    });

    if (!message) return new NextResponse("Internal error", { status: 500 });

    await pusherServer.trigger(id, "messages:new", message);

    return NextResponse.json(updateConversation);
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
