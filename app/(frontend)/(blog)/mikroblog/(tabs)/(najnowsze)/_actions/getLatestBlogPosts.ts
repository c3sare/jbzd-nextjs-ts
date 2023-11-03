import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

export async function getLatestBlogPosts() {
  try {
    const session = await getSession();

    if (!session?.user) return [];

    const posts = await prisma.blogPost.findMany({
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
            addTime: "asc",
          },
        },
        comments: {
          orderBy: {
            addTime: "asc",
          },
          take: 3,
        },
      },
      orderBy: {
        addTime: "asc",
      },
      take: 10,
    });

    return posts.map((post) => ({
      ...post,
      score:
        post.votes.filter((item) => item.method === "PLUS").length -
        post.votes.filter((item) => item.method === "MINUS").length,
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}
