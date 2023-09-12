import prisma from "@/app/libs/prismadb";

export async function getComments(postId: string, sort?: string) {
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
          addTime: "asc",
        }
      : {
          pluses: {
            _count: "asc",
          },
        };

  const comments = await prisma.comment.findMany({
    where: {
      postId,
      NOT: {
        precedentId: {
          isSet: true,
        },
      },
    },
    include: {
      _count: {
        select: {
          pluses: true,
          minuses: true,
          rock: true,
          silver: true,
          gold: true,
        },
      },
      subcomments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          _count: {
            select: {
              pluses: true,
              minuses: true,
              rock: true,
              silver: true,
              gold: true,
            },
          },
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
