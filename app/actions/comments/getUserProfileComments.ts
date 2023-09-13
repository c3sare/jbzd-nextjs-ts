import prisma from "@/app/libs/prismadb";
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
        pluses: {
          _count: "asc" | "desc";
        };
      } =
    sort === "new"
      ? {
          addTime: "desc",
        }
      : {
          pluses: {
            _count: "desc",
          },
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

  const favouriteList = loggedUserId
    ? {
        where: {
          authorId: loggedUserId,
        },
      }
    : undefined;

  const comments = await prisma.comment.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      pluses,
      minuses,
      favouriteList,
      post: true,
      _count: {
        select: {
          pluses: true,
          minuses: true,
          rock: true,
          silver: true,
          gold: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
    orderBy,
  });

  return comments;
}
