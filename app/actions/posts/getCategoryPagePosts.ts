import prisma from "@/app/libs/prismadb";
import { PostType } from "@/app/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import parseSearchParams from "@/utils/parseSearchParams";
import { CategoryPageProps } from "@/app/(postsPages)/components/types/CategoryPageProps";

export async function getCategoryPagePosts({
  params: { index, category },
  searchParams,
}: CategoryPageProps) {
  try {
    if (!category) return null;

    const categoryDB = await prisma.category.findFirst({
      where: {
        slug: category,
      },
      include: {
        children: true,
      },
    });

    if (!categoryDB) return null;

    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const { addTime, memContainers, title, countOnPage } =
      await parseSearchParams(searchParams);

    const categoryId = {
      in: [categoryDB.id, ...categoryDB.children.map((item) => item.id)],
    };

    let findParams: any = {
      addTime,
      memContainers,
      title,
      categoryId,
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

    return {
      posts: posts as PostType[],
      page: Number(index),
      pagesCount,
      categoryName: categoryDB.name,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}