import { getCategoryPagePosts } from "@/actions/posts/getCategoryPagePosts";
import { notFound } from "next/navigation";
import { CategoryPageProps } from "../../(withSidebar)/(postsPages)/components/types/CategoryPageProps";
import Breadcrumb from "@/components/Breadcrumb";
import PostsPageHeader from "../../(withSidebar)/(postsPages)/components/PostsPageHeader";
import Posts from "../../(withSidebar)/(postsPages)/components/Posts";
import Pagination from "../../(withSidebar)/(postsPages)/components/Pagination";
import Link from "next/link";
import { getSession } from "@/actions/getSession";
import { getPremium } from "@/actions/getPremium";
import { getCategories } from "@/actions/getCategories";
import CategoryHeader from "./components/CategoryHeader";
import { getCategoryAction } from "@/actions/getCategoryAction";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

type PageType = {
  params: Promise<CategoryPageProps["params"]>;
  searchParams: Promise<CategoryPageProps["searchParams"]>;
};

export default async function NextHomePage(props: PageType) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const posts = await getCategoryPagePosts({ params, searchParams });

  if (!posts) return notFound();

  const session = await getSession();
  const premium = await getPremium();
  const categories = await getCategories();

  const categoryAction = await getCategoryAction(posts.categoryId);

  const isLoggedIn = Boolean(session?.user?.username);

  return (
    <>
      <Breadcrumb
        currentNode={
          posts.page === 1 ? posts.categoryName : "Strona " + posts.page
        }
      >
        <Link href={`/`}>Strona główna</Link>
        {posts.page > 1 ? (
          <Link href={`/${params.category}`}>{posts.categoryName}</Link>
        ) : null}
      </Breadcrumb>
      <PostsPageHeader
        categories={categories}
        isPremium={premium.isPremium || false}
        isLoggedIn={isLoggedIn}
      >
        {isLoggedIn && (
          <CategoryHeader
            categoryId={posts.categoryId}
            currentAction={categoryAction}
          />
        )}
      </PostsPageHeader>
      <Posts posts={posts.posts} />
      {posts.pagesCount > 1 && (
        <Pagination
          pageName={params.category}
          currentPage={posts.page}
          allPages={posts.pagesCount}
        />
      )}
    </>
  );
}
