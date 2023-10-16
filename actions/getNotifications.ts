import { getSession } from "./getSession";
import prisma from "@/libs/prismadb";

export default async function getNotifications() {
  try {
    const session = await getSession();

    if (!session?.user?.id) return [];

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
      take: 5,
    });

    return notifications;
  } catch {
    return [];
  }
}
