import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import prisma from "@/libs/prismadb";
import BlogPost from "../../_components/pages/BlogPost";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { transformPosts } from "../../_utils/transformPosts";

const OwnBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      blogPosts: {
        where: {
          NOT: {
            parentId: {
              isSet: true,
            },
          },
        },
        include: getIncludePostData(session.user.id),
      },
    },
  });

  if (!user) return notFound();

  const posts = transformPosts(user.blogPosts, session.user.id);

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default OwnBlogsPage;
