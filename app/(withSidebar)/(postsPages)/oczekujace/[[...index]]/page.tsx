import { notFound } from "next/navigation";
import PostsPage from "../../components/PostsPage";
import { PageProps } from "../../components/types/PageProps";
import { getWaitingPagePosts } from "@/app/actions/posts/getWaitingPagePosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: PageProps) {
  const posts = await getWaitingPagePosts(props);

  if (!posts) return notFound();

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
