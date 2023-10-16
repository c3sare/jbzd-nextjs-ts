import prisma from "@/libs/prismadb";
import { PostType } from "@/app/(withSidebar)/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import { PageProps } from "@/app/(withSidebar)/(postsPages)/components/types/PageProps";
import parseSearchParams from "@/utils/parseSearchParams";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export async function getHomePagePosts({
  params: { index },
  searchParams,
}: PageProps) {
  const currentPage = Number(index || 1) - 1;
  const isNanPage = isNaN(currentPage);

  if (isNanPage || currentPage < 0) return null;

  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const { addTime, memContainers, title, countOnPage } =
      await parseSearchParams(searchParams);

    let findParams: any = {
      accepted: {
        isSet: true,
      },
      addTime,
      memContainers,
      title,
      NOT: {
        tagIds: { hasSome: blockedTagsIds },
        authorId: { in: blockedUsersIds },
      },
    };

    const postsCount = await prisma.postStats.count({ where: findParams });

    const pagesCount = Math.ceil(postsCount / countOnPage);

    let posts: any = await prisma.postStats.findMany({
      where: {
        ...findParams,
      },
      orderBy: {
        accepted: "desc",
      },
      skip: countOnPage * currentPage,
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

    return { posts: posts as PostType[], page: currentPage + 1, pagesCount };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
