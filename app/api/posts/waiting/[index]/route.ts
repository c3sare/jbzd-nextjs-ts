import prisma from "@/libs/prismadb";
import { PostType } from "@/app/(withSidebar)/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "@/actions/getActionedUsersLists";
import getActionedTagsLists from "@/actions/getActionedTagsLists";
import parseSearchParams from "@/utils/parseSearchParams";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: {
    index: string;
  };
};

export async function GET(
  request: NextRequest,
  { params: { index } }: ParamsType
) {
  const searchParams = {};

  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    const { addTime, memContainers, title, countOnPage } =
      await parseSearchParams(searchParams);

    let findParams: any = {
      accepted: {
        isSet: false,
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
      return new NextResponse("Internal Error", { status: 500 });
    }

    return NextResponse.json({
      posts: posts as PostType[],
      page: Number(index),
      pagesCount,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
