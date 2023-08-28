import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import PostsPageHeader from "./PostsPageHeader";
import { getPremium } from "@/app/actions/getPremium";
import { getCategories } from "@/app/actions/getCategories";
import { getSession } from "@/app/actions/getSession";
import PostComponent from "./Post/Post";
import { PostType } from "./types/PostType";

type PostsPageProps = {
  posts: PostType[];
  currentNode: string;
  page: number;
  pageSlug: string;
  pagesCount: number;
};

const PostsPage: React.FC<PostsPageProps> = async ({
  posts,
  currentNode,
  page,
  pageSlug,
  pagesCount,
}) => {
  const session = await getSession();
  const premium = await getPremium();
  const categories = await getCategories();

  const isLoggedIn = Boolean(session?.user?.username);

  return (
    <>
      <Breadcrumb currentNode={page === 1 ? currentNode : "Strona " + page}>
        {page > 1 && <Link href={`/${pageSlug}`}>{currentNode}</Link>}
      </Breadcrumb>
      <PostsPageHeader
        categories={categories}
        isPremium={premium.isPremium || false}
        isLoggedIn={isLoggedIn}
      />
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsPage;
