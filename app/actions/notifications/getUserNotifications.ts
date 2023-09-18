import prisma from "@/app/libs/prismadb";
import { getSession } from "../getSession";

export default async function getUserNotifications() {
  const session = await getSession();

  if (!session?.user?.id) {
    return [];
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      addTime: "desc",
    },
    select: {
      id: true,
      addTime: true,
      type: true,
      seen: true,
      author: {
        select: {
          username: true,
        },
      },
      post: {
        select: {
          id: true,
          slug: true,
          title: true,
          memContainers: true,
        },
      },
      commentId: true,
    },
  });

  return notifications;
}
