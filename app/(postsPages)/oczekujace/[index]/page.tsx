import PostsPage from "@/app/(postsPages)/components/PostsPage";
import { PageProps } from "@/app/(postsPages)/components/types/PageProps";
import { getWaitingPagePosts } from "@/app/actions/posts/getWaitingPagePosts";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function NextHomePage(props: PageProps) {
  const posts = await getWaitingPagePosts(props);

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
