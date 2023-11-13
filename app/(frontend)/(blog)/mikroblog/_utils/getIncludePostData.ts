import { Prisma } from "@prisma/client";

export function getIncludePostData(userId: string) {
  const posts = {
    include: {
      questionnaire: {
        include: {
          votes: {
            select: {
              id: true,
              answerId: true,
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
      votes: {
        include: {
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
        orderBy: {
          addTime: "desc",
        },
      },
      children: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          votes: {
            include: {
              user: {
                select: {
                  id: true,
                  image: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: {
          addTime: "asc",
        },
        take: 3,
      },
      _count: {
        select: {
          children: true,
          favouriteBy: {
            where: {
              userId,
            },
          },
          observedBy: {
            where: {
              userId,
            },
          },
        },
      },
    },
  } as const;

  return posts.include;
}
