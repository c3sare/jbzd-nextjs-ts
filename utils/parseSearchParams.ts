import { PageSearchParams } from "@/app/(withSidebar)/(postsPages)/components/types/PageSearchParams";
import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

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
      gte: getPresetDate(datePreset),
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

const parseSearchParams = async (searchParams: PageSearchParams) => {
  const session = await getSession();
  let countOnPage = 8;

  const datePreset = searchParams["date-preset"];

  const { to, from, video, gif, image, text, pharse } = searchParams;

  const addTime = getAddTimeObject({ datePreset, from, to });

  const filteredTypes: string[] = [];

  if (video === "1") filteredTypes.push("VIDEO");

  if (gif === "1") filteredTypes.push("GIF");

  if (image === "1") filteredTypes.push("IMAGE");

  if (text === "1") filteredTypes.push("TEXT");

  const memContainers =
    filteredTypes.length > 0
      ? {
          some: {
            type: {
              in: filteredTypes,
            },
          },
        }
      : undefined;

  const isLoggedIn = Boolean(session?.user?.id);

  let title: any = undefined;

  if (isLoggedIn) {
    const premium = await prisma.user.findFirst({
      where: {
        id: session!.user!.id,
      },
      select: { premiumExpires: true, premium: true },
    });

    if (
      premium &&
      premium.premiumExpires &&
      premium.premiumExpires > new Date()
    ) {
      countOnPage = premium.premium?.picsCountOnPage || 8;
      title = {
        contains: pharse ? decodeURIComponent(pharse) : undefined,
      };
    }
  }

  return { addTime, memContainers, title, countOnPage };
};

export default parseSearchParams;
