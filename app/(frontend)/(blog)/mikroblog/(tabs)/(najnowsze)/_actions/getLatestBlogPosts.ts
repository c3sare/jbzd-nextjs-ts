import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

export async function getLatestBlogPosts() {
  try {
    const session = await getSession();

    if (!session?.user?.id) return [];

    const posts = await prisma.blogPost.findMany({
      where: {
        NOT: {
          parentId: {
            isSet: true,
          },
        },
      },
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
        author: true,
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
          orderBy: {
            addTime: "asc",
          },
          take: 3,
        },
        _count: {
          select: {
            children: true,
          },
        },
      },
      orderBy: {
        addTime: "desc",
      },
      take: 10,
    });

    return posts.map((post) => ({
      ...post,
      method: (post.votes.find((item) => item.userId === session.user!.id)
        ?.method || "") as "" | "PLUS" | "MINUS",
      score:
        post.votes.filter((item) => item.method === "PLUS").length -
        post.votes.filter((item) => item.method === "MINUS").length,
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}
