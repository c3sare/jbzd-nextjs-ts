import Post from "@/app/(postsPages)/components/Post/Post";
import { getPostWithStats } from "@/app/actions/posts/getPostWithStats";
import { notFound } from "next/navigation";
import SinglePostFooter from "./components/SinglePostFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

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

  return (
    <>
      <Breadcrumb currentNode={post.title}>
        <Link href="/">Strona główna</Link>
        <Link href={`/${post.category.slug}`}>{post.category.name}</Link>
        {post.category.parent && (
          <Link href={`/${post.category.parent.slug}`}>
            {post.category.parent.name}
          </Link>
        )}
      </Breadcrumb>
      <Post isPostPage post={post} />
      <SinglePostFooter />
    </>
  );
};

export default MemPage;
