import BlogPost from "../../_components/pages/BlogPost";
import { getLatestBlogPosts } from "./_actions/getLatestBlogPosts";

const NewestBlogsPage = async () => {
  const posts = await getLatestBlogPosts();

  if (!posts) return null;

  return (
    <>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default NewestBlogsPage;
