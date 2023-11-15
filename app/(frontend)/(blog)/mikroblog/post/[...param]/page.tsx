import { notFound } from "next/navigation";
import BlogPost from "../../_components/pages/BlogPost";
import prisma from "@/libs/prismadb";
import { getSession } from "@/actions/getSession";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import { transformPosts } from "../../(tabs)/_actions/getPosts";

type BlogPostPageProps = {
  params: {
    param: string[];
  };
};

const BlogPostPage: React.FC<BlogPostPageProps> = async ({
  params: { param },
}) => {
  const id = param[0] as string;
  const slug = param[1] as string;

  if (!id || !slug) return notFound();

  const session = await getSession();

  if (!session?.user?.id) return notFound();

  const post = await prisma.blogPost.findUnique({
    where: {
      id,
      slug,
      NOT: {
        parentId: {
          isSet: true,
        },
      },
    },
    include: getIncludePostData(session.user.id),
  });

  if (!post) return notFound();

  const newPost = transformPosts([post], session.user.id);

  return <BlogPost post={newPost[0]!} />;
};

export default BlogPostPage;
