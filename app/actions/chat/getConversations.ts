import prisma from "@/app/libs/prismadb";
import { getSession } from "../getSession";

export default async function getConversations() {
  try {
    const session = await getSession();

    if (!session?.user?.id) return null;

    const conversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: session.user.id,
        },
        NOT: {
          messagesIds: { isEmpty: true },
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
    });

    return conversations;
  } catch {
    return null;
  }
}
