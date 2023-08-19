import { Post } from "@prisma/client";
import Breadcrumb from "../Breadcrumb";
import Link from "next/link";
import PostsPageHeader from "./components/PostsPageHeader";
import { getPremium } from "@/app/actions/getPremium";
import { getCategories } from "@/app/actions/getCategories";

type PostsPageProps = {
  posts: Post[];
  currentNode: string;
  page: number;
  pageSlug: string;
};

const PostsPage: React.FC<PostsPageProps> = async ({
  posts,
  currentNode,
  page,
  pageSlug,
}) => {
  const premium = await getPremium();
  const categories = await getCategories();

  return (
    <>
      <Breadcrumb currentNode={page === 1 ? currentNode : "Strona " + page}>
        {page > 1 && <Link href={`/${pageSlug}`}>{currentNode}</Link>}
      </Breadcrumb>
      <PostsPageHeader
        categories={categories}
        isPremium={premium.isPremium || false}
      />
    </>
  );
};

export default PostsPage;
