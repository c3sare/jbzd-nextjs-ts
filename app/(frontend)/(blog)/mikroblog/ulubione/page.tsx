import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import BlogPostInfiniteScroll from "../_components/BlogPostInfiniteScroll";
import { getFavouritePosts } from "./_actions/getFavouritePosts";

const FavouritePage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const posts = await getFavouritePosts(session!.user!.id);

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getFavouritePosts(session!.user!.id, cursor);
    return posts;
  }

  return (
    <div className="w-full md:w-2/3 relative min-h-px px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">Ulubione</h1>
      <BlogPostInfiniteScroll initalPosts={posts} getPostsFunc={getPostsFunc} />
    </div>
  );
};

export default FavouritePage;
