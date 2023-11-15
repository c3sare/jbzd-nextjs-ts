import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import prisma from "@/libs/prismadb";
import BlogPost from "../_components/pages/BlogPost";
import { getPosts } from "../(tabs)/_actions/getPosts";

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

  return (
    <div className="w-full md:w-2/3 relative min-h-[1px] px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">Ulubione</h1>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FavouritePage;
