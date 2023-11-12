import { notFound } from "next/navigation";
import BlogPost from "../../_components/pages/BlogPost";
import prisma from "@/libs/prismadb";
import { getSession } from "@/actions/getSession";

type TVote = "" | "PLUS" | "MINUS";

type BlogPostPageProps = {
  params: {
    param: string[];
  };
};

const BlogPostPage: React.FC<BlogPostPageProps> = async ({
  params: { param },
}) => {
  const id = param[0] as string;
  const slug = param[1] as string;

  if (!id || !slug) return notFound();

  const session = await getSession();

  const post = await prisma.blogPost.findUnique({
    where: {
      id,
      slug,
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
      },
      _count: {
        select: {
          children: true,
        },
      },
    },
  });

  if (!post) return notFound();

  const newPost = {
    ...post,
    method: (post.votes.find((item) => item.userId === session?.user?.id)
      ?.method || "") as TVote,
    votes: post.votes.filter((vote) => vote.userId !== session?.user?.id),
    score:
      post.votes.filter((item) => item.method === "PLUS").length -
      post.votes.filter((item) => item.method === "MINUS").length,
    children: post.children.map((comment) => ({
      ...comment,
      score:
        comment.votes.filter((item) => item.method === "PLUS").length -
        comment.votes.filter((item) => item.method === "MINUS").length,
      votes: comment.votes.filter((vote) => vote.userId !== session?.user?.id),
      method: (comment.votes.find((vote) => vote.userId === session?.user?.id)
        ?.method || "") as TVote,
    })),
  };

  return <BlogPost post={newPost} />;
};

export default BlogPostPage;
