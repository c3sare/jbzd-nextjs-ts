import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user?.id) return new NextResponse("No authorization");

    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        userIds: {
          has: session.user.id,
        },
      },
    });

    if (!conversation)
      return new NextResponse("Conversation can't be deleted!", {
        status: 500,
      });

    const conversationDelete = await prisma.conversation.delete({
      where: {
        id: conversation.id,
      },
      select: {
        id: true,
        userIds: true,
      },
    });

    Promise.all(
      conversationDelete.userIds.map(
        async (userId) =>
          await pusherServer.trigger(
            userId,
            "conversation:delete",
            conversationDelete.id
          )
      )
    );

    return NextResponse.json(conversationDelete);
  } catch (err) {
    return new NextResponse("Error: " + err, { status: 500 });
  }
}
