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
          include: {
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
          },
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
      method: (post.votes.find((vote) => vote.userId === session.user!.id)
        ?.method || "") as "" | "PLUS" | "MINUS",
      score:
        post.votes.filter((item) => item.method === "PLUS").length -
        post.votes.filter((item) => item.method === "MINUS").length,
      votes: post.votes.filter((item) => item.userId !== session.user?.id),
      children: post.children.map((child) => ({
        ...child,
        method: (child.votes.find((vote) => vote.userId === session.user!.id)
          ?.method || "") as "" | "PLUS" | "MINUS",
        score:
          child.votes.filter((item) => item.method === "PLUS").length -
          child.votes.filter((item) => item.method === "MINUS").length,
        votes: child.votes.filter((item) => item.userId !== session.user?.id),
      })),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}
