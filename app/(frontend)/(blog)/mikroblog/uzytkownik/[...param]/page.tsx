import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { notFound } from "next/navigation";
import BlogPost from "../../_components/pages/BlogPost";

type TVote = "" | "PLUS" | "MINUS";

type UserBlogPageProps = {
  params: {
    param: string[];
  };
};

const UserBlogPage: React.FC<UserBlogPageProps> = async ({
  params: { param },
}) => {
  const id = param[0] as string;
  const username = param[1] as string;

  if (!id || !username) return notFound();

  const session = await getSession();

  if (!session?.user?.id) return notFound();

  const user = await prisma.user.findUnique({
    where: {
      id,
      username,
    },
    select: {
      id: true,
      username: true,
      image: true,
      blogPosts: {
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
            },
          },
        },
        orderBy: {
          addTime: "desc",
        },
      },
    },
  });

  if (!user) return notFound();

  const posts = user.blogPosts.map((post) => ({
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

  return (
    <div className="w-full">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">
        Użytkownik: {user.username}
      </h1>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserBlogPage;
