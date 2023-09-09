import PostsPage from "@/app/(postsPages)/components/PostsPage";
import { PageProps } from "@/app/(postsPages)/components/types/PageProps";
import { getHomePagePosts } from "@/app/actions/posts/getHomePagePosts";
import { notFound } from "next/navigation";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function NextHomePage(props: PageProps) {
  const posts = await getHomePagePosts(props);

  if (!posts || posts.posts.length === 0) return notFound();

  return (
    <PostsPage
      page={posts.page}
      pagesCount={posts.pagesCount}
      pageSlug=""
      currentNode="Strona główna"
      posts={posts.posts}
    />
  );
}
