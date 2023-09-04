import { getCategoryPagePosts } from "@/app/actions/posts/getCategoryPagePosts";
import { notFound } from "next/navigation";
import { CategoryPageProps } from "../../components/types/CategoryPageProps";
import Breadcrumb from "@/app/components/Breadcrumb";
import PostsPageHeader from "../../components/PostsPageHeader";
import Posts from "../../components/Posts";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import { getSession } from "@/app/actions/getSession";
import { getPremium } from "@/app/actions/getPremium";
import { getCategories } from "@/app/actions/getCategories";
import CategoryHeader from "../components/CategoryHeader";
import { getCategoryAction } from "@/app/actions/getCategoryAction";

export default async function NextHomePage(props: CategoryPageProps) {
  const posts = await getCategoryPagePosts(props);

  if (!posts || posts.posts.length === 0) return notFound();

  const session = await getSession();
  const premium = await getPremium();
  const categories = await getCategories();

  const isLoggedIn = Boolean(session?.user?.username);

  const currentAction = await getCategoryAction(posts.categoryId);

  return (
    <>
      <Breadcrumb
        currentNode={
          posts.page === 1 ? posts.categoryName : "Strona " + posts.page
        }
      >
        <Link href={`/`}>Strona główna</Link>
        {posts.page > 1 ? (
          <Link href={`/${props.params.category}`}>{posts.categoryName}</Link>
        ) : null}
      </Breadcrumb>
      <PostsPageHeader
        categories={categories}
        isPremium={premium.isPremium || false}
        isLoggedIn={isLoggedIn}
      >
        <CategoryHeader
          categoryId={posts.categoryId}
          currentAction={currentAction}
        />
      </PostsPageHeader>
      <Posts posts={posts.posts} />
      {posts.pagesCount > 1 && (
        <Pagination
          pageName={props.params.category}
          currentPage={posts.page}
          allPages={posts.pagesCount}
        />
      )}
    </>
  );
}
