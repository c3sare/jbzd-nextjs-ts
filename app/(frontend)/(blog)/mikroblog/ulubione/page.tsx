import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import prisma from "@/libs/prismadb";
import { getPosts } from "../(tabs)/_actions/getPosts";
import BlogPostInfiniteScroll from "../_components/BlogPostInfiniteScroll";

const FavouritePage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const favouritePosts = await prisma.favouriteBlogPost.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const favouritePostIds = favouritePosts.map((fav) => fav.postId);

  const posts = await getPosts({
    where: {
      NOT: undefined,
      id: {
        in: favouritePostIds,
      },
    },
  });

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const posts = await getPosts({
      where: {
        NOT: undefined,
        id: {
          in: favouritePostIds,
        },
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
    });
    return posts;
  }

  return (
    <div className="w-full md:w-2/3 relative min-h-[1px] px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">Ulubione</h1>
      <BlogPostInfiniteScroll initalPosts={posts} getPostsFunc={getPostsFunc} />
    </div>
  );
};

export default FavouritePage;
