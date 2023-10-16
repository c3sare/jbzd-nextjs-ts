import { getSession } from "../getSession";
import prisma from "@/libs/prismadb";

export default async function getMessages(id: string) {
  const session = await getSession();

  if (!session?.user?.id) return null;

  const conversation = await prisma.conversation.findFirst({
    where: {
      id,
      userIds: {
        has: session.user.id,
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
          addTime: "asc",
        },
      },
    },
  });

  if (!conversation) return null;

  return conversation;
}
