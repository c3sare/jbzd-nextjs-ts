import prisma from "@/app/libs/prismadb";
import { pusherServer } from "../libs/pusher";

type NotifyData = {
  postId: string;
  postAuthorId: string;
  commentId?: string;
  commentAuthorId?: string;
};

export default async function addNotification(
  type: "NEW_COMMENT" | "COMMENT_PIN" | "BADGE",
  { postId, postAuthorId, commentId, commentAuthorId }: NotifyData
) {
  const notification = await prisma.notification.create({
    data: {
      type,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: { id: postAuthorId },
      },
      ...(commentId
        ? {
            comment: {
              connect: {
                id: commentId,
              },
            },
          }
        : {}),
      ...{
        author: {
          connect: {
            id: commentAuthorId || postAuthorId,
          },
        },
      },
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

  await pusherServer.trigger(postAuthorId, "notification:new", notification);

  return notification;
}
