import PostsPage from "../../../components/PostsPage";
import { getHomePagePosts } from "@/actions/posts/getHomePagePosts";
import { PageProps } from "../../../components/types/PageProps";
import { notFound } from "next/navigation";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

type PageType = {
  params: Promise<PageProps["params"]>;
  searchParams: Promise<PageProps["searchParams"]>;
};

export default async function NextHomePage(props: PageType) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const posts = await getHomePagePosts({ params, searchParams });

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
