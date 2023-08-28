import prisma from "@/app/libs/prismadb";
import { getSession } from "./getSession";

export default async function getActionedUsersLists() {
  const session = await getSession();

  let blockedUsersIds: string[] = [];
  let followedUsersIds: string[] = [];

  if (session?.user?.id) {
    const actions = await prisma.userAction.findMany({
      where: {
        authorId: session.user.id,
      },
    });

    blockedUsersIds = actions
      .filter((action) => action.method === "BLOCK")
      .map((action) => action.userId);
    followedUsersIds = actions
      .filter((action) => action.method === "FOLLOW")
      .map((action) => action.userId);
  }

  return { blockedUsersIds, followedUsersIds };
}
