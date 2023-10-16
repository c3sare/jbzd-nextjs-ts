import prisma from "@/libs/prismadb";
import { getSession } from "../getSession";

export async function getFavouriteComments(sort: "new" | "best") {
  const session = await getSession();

  const loggedUserId = session?.user?.id || null;

  const orderBy:
    | {
        addTime: "asc" | "desc";
      }
    | {
        score: "asc" | "desc";
      } =
    sort === "new"
      ? {
          addTime: "desc",
        }
      : {
          score: "desc",
        };

  const pluses = loggedUserId
    ? {
        where: {
          authorId: loggedUserId,
        },
      }
    : undefined;

  const minuses = loggedUserId
    ? {
        where: {
          authorId: loggedUserId,
        },
      }
    : undefined;

  const favouriteBy = loggedUserId
    ? {
        where: {
          authorId: loggedUserId,
        },
      }
    : undefined;

  const actionedBy = loggedUserId
    ? {
        where: {
          authorId: loggedUserId,
        },
      }
    : undefined;

  const favouriteByFilter = loggedUserId
    ? {
        favouriteBy: {
          some: {
            authorId: loggedUserId,
          },
        },
      }
    : {};

  const comments = await prisma.commentStats.findMany({
    where: {
      ...favouriteByFilter,
    },
    include: {
      pluses,
      minuses,
      favouriteBy,
      author: {
        include: {
          actionedBy,
        },
      },
    },
    orderBy,
  });

  return comments;
}
