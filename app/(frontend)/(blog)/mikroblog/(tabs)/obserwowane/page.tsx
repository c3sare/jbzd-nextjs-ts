import { getSession } from "@/actions/getSession";
import BlogPost from "../../_components/pages/BlogPost";
import { notFound } from "next/navigation";
import { getPosts } from "../_actions/getPosts";
import prisma from "@/libs/prismadb";

const ObservedBlogsPage = async () => {
  const session = await getSession();

  if (!session?.user) return notFound();

  const observedBlogPosts = await prisma.observedBlogPost.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const observedBlogPostIds = observedBlogPosts.map((post) => post.postId);

  console.log(observedBlogPostIds);

  const posts = await getPosts({
    where: {
      id: {
        in: observedBlogPostIds,
      },
      NOT: undefined,
    },
  });

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default ObservedBlogsPage;
