import prisma from "@/libs/prismadb";
import { getSession } from "./getSession";

export default async function getActionedTagsLists() {
  const session = await getSession();

  let blockedTagsIds: string[] = [];
  let followedTagsIds: string[] = [];

  if (session?.user?.id) {
    const actions = await prisma.tagAction.findMany({
      where: {
        authorId: session.user.id,
      },
    });

    blockedTagsIds = actions
      .filter((action) => action.method === "BLOCK")
      .map((action) => action.tagId);
    followedTagsIds = actions
      .filter((action) => action.method === "FOLLOW")
      .map((action) => action.tagId);
  }

  return { blockedTagsIds, followedTagsIds };
}
