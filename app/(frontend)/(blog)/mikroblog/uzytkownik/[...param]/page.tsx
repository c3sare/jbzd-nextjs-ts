import { notFound } from "next/navigation";
import BlogPost from "../../_components/pages/BlogPost";
import { getPosts } from "../../(tabs)/_actions/getPosts";

type UserBlogPageProps = {
  params: {
    param: string[];
  };
};

const UserBlogPage: React.FC<UserBlogPageProps> = async ({
  params: { param },
}) => {
  const id = param[0] as string;
  const username = param[1] as string;

  if (!id || !username) return notFound();

  const posts = await getPosts({
    where: {
      author: {
        username,
      },
    },
  });

  if (!posts) return notFound();

  return (
    <div className="w-full md:w-2/3 relative min-h-[1px] px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">
        Użytkownik: {username}
      </h1>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserBlogPage;
