import prisma from "@/app/libs/prismadb";
import { PostType } from "@/app/(postsPages)/components/types/PostType";
import addActionPostInfo from "@/utils/addActionPostInfo";
import getActionedUsersLists from "../getActionedUsersLists";
import getActionedTagsLists from "../getActionedTagsLists";
import { PageProps } from "@/app/(postsPages)/components/types/PageProps";

function getPresetDate(arg: string) {
  const date = new Date();
  const type = arg.slice(arg.length - 1).toLowerCase();
  const val = Number(arg.slice(0, arg.length - 1));

  if (type === "h") date.setHours(date.getHours() - val);

  if (type === "d") date.setDate(date.getDate() - val);

  return date;
}

function getAddTimeObject({
  datePreset,
  from,
  to,
}: {
  datePreset?: string;
  from?: string;
  to?: string;
}) {
  if (datePreset) {
    return {
      gt: getPresetDate(datePreset),
    };
  } else if (from && to) {
    return {
      gte: new Date(from),
      lte: new Date(to),
    };
  } else {
    return undefined;
  }
}

export async function getWaitingPagePosts({
  params: { index },
  searchParams,
}: PageProps) {
  try {
    const { blockedUsersIds, followedUsersIds } = await getActionedUsersLists();

    const { blockedTagsIds, followedTagsIds } = await getActionedTagsLists();

    let countOnPage = 8;

    const datePreset = searchParams["date-preset"];

    const { to, from, video, gif, image, text } = searchParams;

    const addTime = getAddTimeObject({ datePreset, from, to });

    const findParams = {
      accepted: {
        isSet: false,
      },
      addTime,
      NOT: {
        tagIds: { hasSome: blockedTagsIds },
        authorId: { in: blockedUsersIds },
      },
    };

    const postsCount = await prisma.postStats.count({ where: findParams });

    const pagesCount = Math.ceil(postsCount / countOnPage);

    const filteredTypes = [];

    if (video === "1") filteredTypes.push("VIDEO");

    if (gif === "1") filteredTypes.push("GIF");

    if (image === "1") filteredTypes.push("IMAGE");

    if (text === "1") filteredTypes.push("TEXT");

    let posts: any = await prisma.postStats.findMany({
      where: {
        ...findParams,
        ...(filteredTypes.length > 0
          ? {
              memContainers: {
                some: {
                  type: {
                    in: filteredTypes,
                  },
                },
              },
            }
          : {}),
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
