import { getSession } from "./getSession";
import prisma from "@/libs/prismadb";

export default async function getLastMessages() {
  try {
    const session = await getSession();

    if (!session?.user?.id) return [];

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
        lastMessageAt: "desc",
      },
      take: 3,
    });

    return conversations;
  } catch (err: any) {
    return [];
  }
}
