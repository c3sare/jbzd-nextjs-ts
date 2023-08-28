import prisma from "@/app/libs/prismadb";
import { PostType } from "@/app/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import { PageProps } from "@/app/(postsPages)/components/types/PageProps";

export async function getHomePagePosts({
  params: { index },
  searchParams,
}: PageProps) {
  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    let countOnPage = 8;

    const searchParams = {
      where: {
        accepted: {
          isSet: true,
        },
        NOT: {
          tagIds: { hasSome: blockedTagsIds },
          authorId: { in: blockedUsersIds },
        },
      },
    };

    const postsCount = await prisma.postStats.count(searchParams);

    const pagesCount = Math.ceil(postsCount / countOnPage);

    let posts: any = await prisma.postStats.findMany({
      ...searchParams,
      orderBy: {
        accepted: "asc",
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

    return { posts: posts as PostType[], page: index, pagesCount };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
