import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import BlogPostInfiniteScroll from "../../_components/BlogPostInfiniteScroll";
import { getObservedPosts } from "./_actions/getObservedPosts";

const ObservedBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const posts = await getObservedPosts(session.user.id);

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getObservedPosts(session!.user!.id, cursor);

    return posts;
  }

  return (
    <BlogPostInfiniteScroll getPostsFunc={getPostsFunc} initalPosts={posts} />
  );
};

export default ObservedBlogsPage;
