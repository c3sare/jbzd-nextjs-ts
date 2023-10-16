import prisma from "@/libs/prismadb";
import { PostType } from "@/app/(withSidebar)/(postsPages)/components/types/PostType";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import addActionPostInfo from "@/utils/addActionPostInfo";

export async function getPostWithStats(id: string, slug: string) {
  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    let post: any = await prisma.postStats.findFirst({
      where: {
        id,
        slug,
      },
    });

    if (!post) {
      return null;
    }

    post = await addActionPostInfo(
      [post],
      blockedUsersIds,
      followedUsersIds,
      blockedTagsIds,
      followedTagsIds
    );

    return post[0] as PostType;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
