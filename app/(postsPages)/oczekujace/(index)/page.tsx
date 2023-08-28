import { notFound } from "next/navigation";
import PostsPage from "../../components/PostsPage";
import { PageProps } from "../../components/types/PageProps";
import { getWaitingPagePosts } from "@/app/actions/posts/getWaitingPagePosts";

export default async function Home(props: PageProps) {
  const posts = await getWaitingPagePosts({
    params: { index: 1 },
    searchParams: props.searchParams,
  });

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
