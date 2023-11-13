import { getSession } from "@/actions/getSession";
import BlogPost from "../../_components/pages/BlogPost";
import prisma from "@/libs/prismadb";
import { notFound } from "next/navigation";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { transformPosts } from "../../_utils/transformPosts";

const ObservedBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const observed = await prisma.observedBlogPost.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      post: {
        include: getIncludePostData(session.user.id),
      },
    },
  });

  const posts = transformPosts(
    observed.map((item) => item.post),
    session.user.id
  );

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default ObservedBlogsPage;
