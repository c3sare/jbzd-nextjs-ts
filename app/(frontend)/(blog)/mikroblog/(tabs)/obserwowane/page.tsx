import { getSession } from "@/actions/getSession";
import BlogPost from "../../_components/pages/BlogPost";
import { notFound } from "next/navigation";
import { getPosts } from "../_actions/getPosts";
import prisma from "@/libs/prismadb";
import BlogPostInfiniteScroll from "../../_components/BlogPostInfiniteScroll";

const ObservedBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const observedBlogPosts = await prisma.observedBlogPost.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const observedBlogPostIds = observedBlogPosts.map((post) => post.postId);

  const posts = await getPosts({
    where: {
      id: {
        in: observedBlogPostIds,
      },
      NOT: undefined,
    },
  });

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getPosts({
      where: {
        id: {
          in: observedBlogPostIds,
        },
        NOT: undefined,
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
    });

    return posts;
  }

  return (
    <BlogPostInfiniteScroll getPostsFunc={getPostsFunc} initalPosts={posts} />
  );
};

export default ObservedBlogsPage;
