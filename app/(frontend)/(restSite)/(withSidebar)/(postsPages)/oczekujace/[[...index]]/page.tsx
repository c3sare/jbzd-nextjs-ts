import { notFound } from "next/navigation";
import PostsPage from "../../components/PostsPage";
import { PageProps } from "../../components/types/PageProps";
import { getWaitingPagePosts } from "@/actions/posts/getWaitingPagePosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

type PageType = {
  params: Promise<PageProps["params"]>;
  searchParams: Promise<PageProps["searchParams"]>;
};

export default async function Home(props: PageType) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const posts = await getWaitingPagePosts({ params, searchParams });

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
