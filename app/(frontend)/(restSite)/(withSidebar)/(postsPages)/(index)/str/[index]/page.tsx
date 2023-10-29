import PostsPage from "../../../components/PostsPage";
import { getHomePagePosts } from "@/actions/posts/getHomePagePosts";
import { PageProps } from "../../../components/types/PageProps";
import { notFound } from "next/navigation";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function NextHomePage(props: PageProps) {
  const posts = await getHomePagePosts(props);

  if (!posts) return notFound();

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
