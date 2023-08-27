import Post from "@/app/(postsPages)/components/Post/Post";
import { getPostWithStats } from "@/app/actions/posts/getPostWithStats";
import { notFound } from "next/navigation";

type MemPageProps = {
  params: {
    postId: string;
    slug: string;
  };
};

const MemPage: React.FC<MemPageProps> = async ({
  params: { postId, slug },
}) => {
  if (!postId || !slug) return notFound();

  const post = await getPostWithStats(postId, slug);

  if (!post) return notFound();

  return <Post post={post} />;
};

export default MemPage;
