import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getSession } from "@/actions/getSession";
import { pusherServer } from "@/libs/pusher";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No autorization", { status: 403 });

    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
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
      data: {
        seen: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    const conversationWithLastMessage = {
      id,
      messages: [updatedMessage],
    };

    if (lastMessage.seenIds.indexOf(session.user.id) !== -1) {
      return NextResponse.json(conversation);
    }

    Promise.all(
      updatedMessage.seenIds.map(
        async (userId) =>
          await pusherServer.trigger(
            userId,
            "message:update",
            conversationWithLastMessage
          )
      )
    );

    return new NextResponse("Success");
  } catch (err: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
