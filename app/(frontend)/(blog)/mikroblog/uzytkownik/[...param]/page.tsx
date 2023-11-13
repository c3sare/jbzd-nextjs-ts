import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { notFound } from "next/navigation";
import BlogPost from "../../_components/pages/BlogPost";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { transformPosts } from "../../_utils/transformPosts";

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

  const session = await getSession();

  if (!session?.user?.id) return notFound();

  const user = await prisma.user.findUnique({
    where: {
      id,
      username,
    },
    select: {
      id: true,
      username: true,
      image: true,
      blogPosts: {
        where: {
          NOT: {
            parentId: {
              isSet: true,
            },
          },
        },
        include: getIncludePostData(session.user.id),
        orderBy: {
          addTime: "desc",
        },
      },
    },
  });

  if (!user) return notFound();

  const posts = transformPosts(user.blogPosts, session.user.id);

  return (
    <div className="w-full md:w-2/3 relative min-h-[1px] px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">
        Użytkownik: {user.username}
      </h1>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserBlogPage;
