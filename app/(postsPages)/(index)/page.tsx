import { notFound } from "next/navigation";
import PostsPage from "../components/PostsPage";
import { getHomePagePosts } from "@/app/actions/posts/getHomePagePosts";

export default async function Home() {
  const posts = await getHomePagePosts({ page: 1 });

  if (!posts) return notFound();

  return (
    <PostsPage page={1} pageSlug="" currentNode="Strona główna" posts={posts} />
  );
}
