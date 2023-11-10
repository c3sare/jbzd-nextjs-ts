import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

type TVote = "" | "PLUS" | "MINUS";

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
      votes: post.votes.filter((vote) => vote.userId !== session.user!.id),
      score:
        post.votes.filter((item) => item.method === "PLUS").length -
        post.votes.filter((item) => item.method === "MINUS").length,
      method: (post.votes.find((vote) => vote.userId === session.user!.id)
        ?.method || "") as TVote,
      children: post.children.map((child) => ({
        ...child,
        score:
          child.votes.filter((item) => item.method === "PLUS").length -
          child.votes.filter((item) => item.method === "MINUS").length,
        votes: child.votes.filter((vote) => vote.userId !== session.user!.id),
        method: (child.votes.find((vote) => vote.userId === session.user!.id)
          ?.method || "") as TVote,
      })),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}
