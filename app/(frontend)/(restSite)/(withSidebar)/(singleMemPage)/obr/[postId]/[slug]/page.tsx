import { getPostWithStats } from "@/actions/posts/getPostWithStats";
import { notFound } from "next/navigation";
import SinglePostFooter from "./components/SinglePostFooter";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import SinglePost from "./components/SinglePost";
import CommentSection from "./components/CommentsSection";
import { getComments } from "@/actions/comments/getComments";
import { getSession } from "@/actions/getSession";

type MemPageProps = {
  params: {
    postId: string;
    slug: string;
  };
  searchParams: {
    sort?: string;
  };
};

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

const MemPage: React.FC<MemPageProps> = async ({
  params: { postId, slug },
  searchParams: { sort },
}) => {
  if (!postId || !slug) return notFound();

  const post = await getPostWithStats(postId, slug);

  if (!post) return notFound();

  const comments = await getComments(post.id, sort);

  if (!comments) return notFound();

  const session = await getSession();

  const isLoggedIn = Boolean(session?.user?.id);

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
      <SinglePost post={post} />
      <SinglePostFooter />
      <CommentSection
        avatar={post.author?.image || "/images/avatars/default.jpg"}
        commentsCount={post.comments}
        comments={comments}
        postId={post.id}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default MemPage;
