import prisma from "@/app/libs/prismadb";
import { PostType } from "@/app/(withSidebar)/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import { PostsTabProps } from "@/app/(withSidebar)/uzytkownik/[username]/(dzidy)/page";

export async function getUserPagePosts({
  params: { index, username },
}: PostsTabProps) {
  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const countOnPage = 8;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) return null;

    let findParams: any = {
      authorId: user.id,
    };

    const postsCount = await prisma.postStats.count({ where: findParams });

    const pagesCount = Math.ceil(postsCount / countOnPage);

    let posts: any = await prisma.postStats.findMany({
      where: {
        ...findParams,
      },
      orderBy: {
        addTime: "desc",
      },
      skip: countOnPage * (Number(index) - 1),
      take: countOnPage,
    });

    posts = await addActionPostInfo(
      posts,
      blockedUsersIds,
      followedUsersIds,
      blockedTagsIds,
      followedTagsIds
    );

    if (!posts) {
      return null;
    }

    return { posts: posts as PostType[], page: Number(index), pagesCount };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
