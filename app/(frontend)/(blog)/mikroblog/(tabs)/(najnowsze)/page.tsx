import { getPosts } from "../_actions/getPosts";
import BlogPostInfiteScroll from "../../_components/BlogPostInfiniteScroll";

const NewestBlogsPage = async () => {
  const posts = await getPosts({});

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getPosts({
      skip: 1,
      cursor: {
        id: cursor,
      },
    });

    return posts;
  }

  return (
    <BlogPostInfiteScroll getPostsFunc={getPostsFunc} initalPosts={posts} />
  );
};

export default NewestBlogsPage;
