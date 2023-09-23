import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getSession } from "@/app/actions/getSession";
import { pusherServer } from "@/app/libs/pusher";

type Params = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params: { id } }: Params) {
  try {
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

    // Update all connections with new seen
    const conversationWithLastMessage = {
      id,
      messages: [updatedMessage],
    };

    await pusherServer.trigger(
      session.user.email,
      "conversation:update",
      conversationWithLastMessage
    );

    // If user has already seen the message, no need to go further
    if (lastMessage.seenIds.indexOf(session.user.id) !== -1) {
      return NextResponse.json(conversation);
    }

    // Update last message seen
    await pusherServer.trigger(id, "message:update", updatedMessage);

    Promise.all(
      updatedMessage.seenIds.map(
        async (userId) =>
          await pusherServer.trigger(
            userId,
            "xmessages:update",
            conversationWithLastMessage
          )
      )
    );

    return new NextResponse("Success");
  } catch (err: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
