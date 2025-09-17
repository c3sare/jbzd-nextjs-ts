import { notFound } from "next/navigation";
import BlogPostInfiteScroll from "../../_components/BlogPostInfiniteScroll";
import { getUserPosts } from "./_actions/getUserPosts";

type UserBlogPageProps = {
  params: Promise<{
    param: string[];
  }>;
};

const UserBlogPage: React.FC<UserBlogPageProps> = async ({ params }) => {
  const { param } = await params;
  const userId = param[0] as string;
  const username = param[1] as string;

  if (!userId || !username) return notFound();

  const posts = await getUserPosts({
    userId,
  });

  if (!posts) return notFound();

  async function getPostsFunc(cursor: string | undefined) {
    "use server";
    const newPosts = await getUserPosts({ userId, cursor });

    return newPosts;
  }

  return (
    <div className="w-full md:w-2/3 relative min-h-px px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">
        Użytkownik: {username}
      </h1>
      <BlogPostInfiteScroll initalPosts={posts} getPostsFunc={getPostsFunc} />
    </div>
  );
};

export default UserBlogPage;
