import { notFound } from "next/navigation";
import PostsPage from "../components/PostsPage";
import { getHomePagePosts } from "@/app/actions/posts/getHomePagePosts";
import { PageProps } from "../components/types/PageProps";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: PageProps) {
  const posts = await getHomePagePosts({
    params: { index: "1" },
    searchParams: props.searchParams,
  });

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
