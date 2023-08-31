import PostsPage from "@/app/(postsPages)/components/PostsPage";
import { getCategoryPagePosts } from "@/app/actions/posts/getCategoryPagePosts";
import { notFound } from "next/navigation";
import { CategoryPageProps } from "../../components/types/CategoryPageProps";

export default async function NextHomePage(props: CategoryPageProps) {
  const posts = await getCategoryPagePosts(props);

  if (!posts || posts.posts.length === 0) return notFound();

  return (
    <PostsPage
      page={posts.page}
      pagesCount={posts.pagesCount}
      pageSlug={props.params.category}
      currentNode={posts.categoryName}
      posts={posts.posts}
    />
  );
}
