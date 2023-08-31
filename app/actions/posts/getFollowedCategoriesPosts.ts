import prisma from "@/app/libs/prismadb";
import { PostType } from "@/app/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import { PageProps } from "@/app/(postsPages)/components/types/PageProps";
import parseSearchParams from "@/utils/parseSearchParams";
import getFollowedCategoriesIds from "../getFollowedCategoriesIds";

export async function getFollowedCategoriesPosts({
  params: { index },
  searchParams,
}: PageProps) {
  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const followedCategoriesIds = await getFollowedCategoriesIds();

    const { addTime, memContainers, title, countOnPage } =
      await parseSearchParams(searchParams);

    let findParams: any = {
      addTime,
      memContainers,
      title,
      categoryId: { in: followedCategoriesIds },
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
