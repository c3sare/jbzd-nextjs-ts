import prisma from "@/libs/prismadb";
import { PostType } from "@/app/(frontend)/(withSidebar)/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import parseSearchParams from "@/utils/parseSearchParams";
import { TagPageProps } from "@/app/(frontend)/(withSidebar)/(postsPages)/components/types/TagPageProps";

export async function getTagPagePosts({
  params: { index, tagId, slug },
  searchParams,
}: TagPageProps) {
  try {
    if (!tagId || !slug) return null;

    const currentPage = Number(index || 1) - 1;
    const isNanPage = isNaN(currentPage);

    if (isNanPage || currentPage < 0) return null;

    const tag = await prisma.tag.findFirst({
      where: {
        slug,
        id: tagId,
      },
    });

    if (!tag) return null;

    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const { addTime, memContainers, title, countOnPage } =
      await parseSearchParams(searchParams);

    let findParams: any = {
      tagIds: {
        has: tag.id,
      },
      addTime,
      memContainers,
      title,
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

    if (posts.length === 0 && currentPage > 0) return null;

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

    return {
      posts: posts as PostType[],
      page: Number(index),
      pagesCount,
      tag,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
