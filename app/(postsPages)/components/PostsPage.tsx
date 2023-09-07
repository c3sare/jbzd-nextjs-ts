import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import PostsPageHeader from "./PostsPageHeader";
import { getPremium } from "@/app/actions/getPremium";
import { getCategories } from "@/app/actions/getCategories";
import { getSession } from "@/app/actions/getSession";
import { PostType } from "./types/PostType";
import PageSelect from "./Pagination";
import Posts from "./Posts";
import { memo } from "react";

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
        {pageSlug !== "" ? <Link href={`/`}>Strona główna</Link> : null}
        {page > 1 ? <Link href={`/${pageSlug}`}>{currentNode}</Link> : null}
      </Breadcrumb>
      <PostsPageHeader
        categories={categories}
        isPremium={premium.isPremium || false}
        isLoggedIn={isLoggedIn}
      />
      <Posts posts={posts} />
      {pagesCount > 1 && (
        <PageSelect
          pageName={pageSlug}
          currentPage={page}
          allPages={pagesCount}
        />
      )}
    </>
  );
};

export default memo(PostsPage);
