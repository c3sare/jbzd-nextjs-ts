import prisma from "@/app/libs/prismadb";
import { PostType } from "@/app/(withSidebar)/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import { PageProps } from "@/app/(withSidebar)/(postsPages)/components/types/PageProps";
import parseSearchParams from "@/utils/parseSearchParams";
import getFavouritePostsIds from "../getFavouritePostsIds";

export async function getFavouritePagePosts({
  params: { index },
  searchParams,
}: PageProps) {
  const currentPage = Number(index || 1) - 1;
  const isNanPage = isNaN(currentPage);

  if(isNanPage || currentPage < 0)
    return null;

  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const { countOnPage } = await parseSearchParams(searchParams);

    const favouritePostIds = await getFavouritePostsIds();

    let findParams: any = {
      id: {
        in: favouritePostIds,
      },
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

    if(posts.length === 0 && currentPage > 0)
      return null;

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
