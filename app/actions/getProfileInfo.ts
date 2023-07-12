import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

export default async function getProfileInfo() {
  const session = await getSession();

  if (!session?.user?.email) {
    return {};
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    include: {
      _count: {
        select: {
          posts: {},
          comments: {},
        },
      },
      posts: {
        where: {
          accepted: true,
        },
      },
    },
  });

  if (!user) return {};

  return {
    username: user.username,
    createdAt: user.createdAt,
    image: user.image,
    posts: {
      accepted: user._count.posts,
      all: user.posts.length,
    },
    comments: user._count.comments,
  };
}
