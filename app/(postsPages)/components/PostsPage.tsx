import type { Post } from "@prisma/client";

import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import PostsPageHeader from "./PostsPageHeader";
import { getPremium } from "@/app/actions/getPremium";
import { getCategories } from "@/app/actions/getCategories";
import { getSession } from "@/app/actions/getSession";

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
    </>
  );
};

export default PostsPage;
