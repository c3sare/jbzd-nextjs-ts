import PostsPage from "@/app/(postsPages)/components/PostsPage";
import { PageProps } from "@/app/(postsPages)/components/types/PageProps";
import { notFound } from "next/navigation";
import { getHomePagePosts } from "@/app/actions/posts/getHomePagePosts";

export default async function NextHomePage(props: PageProps) {
  const posts = await getHomePagePosts(props);

  if (!posts || posts.posts.length === 0) return notFound();

  return (
    <PostsPage
      page={posts.page}
      pagesCount={posts.pagesCount}
      pageSlug="oczekujace"
      currentNode="Oczekujące"
      posts={posts.posts}
    />
  );
}
