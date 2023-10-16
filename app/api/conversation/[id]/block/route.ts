import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 403 });

    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        userIds: {
          has: session.user.id,
        },
        OR: [
          {
            userBlockedId: {
              isSet: false,
            },
          },
          {
            userBlockedId: session.user.id,
          },
        ],
      },
    });

    if (!conversation)
      return new NextResponse("Internal error", { status: 400 });

    const updateConversation = await prisma.conversation.update({
      where: {
        id,
      },
      data: {
        userBlockedId: conversation.userBlockedId
          ? { unset: true }
          : session.user.id,
      },
    });

    Promise.all(
      updateConversation.userIds.map(
        async (userId) =>
          await pusherServer.trigger(userId, "conversation:block", {
            conversationId: updateConversation.id,
            userBlockedId: updateConversation.userBlockedId || null,
          })
      )
    );

    return NextResponse.json({
      userBlockedId: updateConversation?.userBlockedId,
    });
  } catch (err: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
