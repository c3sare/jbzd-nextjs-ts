import { getSession } from "@/actions/getSession";
import { getPosts } from "../_actions/getPosts";
import BlogPostInfiniteScroll from "../../_components/BlogPostInfiniteScroll";

const OwnBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return [];

  const posts = await getPosts({
    where: {
      authorId: session.user.id,
      NOT: undefined,
    },
  });

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getPosts({
      where: {
        authorId: session!.user!.id,
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

export default OwnBlogsPage;
