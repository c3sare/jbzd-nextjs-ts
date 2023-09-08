import { notFound } from "next/navigation";
import PostsPage from "../../components/PostsPage";
import getPosts from "../actions/getPosts";

export default async function Home() {
  const posts = await getPosts("1");

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
