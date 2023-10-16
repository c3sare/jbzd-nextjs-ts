import prisma from "@/libs/prismadb";
import { getSession } from "../getSession";

export async function getUserProfileComments(username: string, sort?: string) {
  const session = await getSession();

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) return null;

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

  const comments = await prisma.commentStats.findMany({
    where: {
      authorId: user.id,
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
