import { notFound } from "next/navigation";
import PostsPage from "../../../components/PostsPage";
import { PageProps } from "../../../components/types/PageProps";
import { getFollowedCategoriesPosts } from "@/actions/posts/getFollowedCategoriesPosts";

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
  const posts = await getFollowedCategoriesPosts({ params, searchParams });

  if (!posts) return notFound();

  return (
    <PostsPage
      page={posts?.page || 1}
      pagesCount={posts?.pagesCount || 1}
      pageSlug="obserwowane/dzialy"
      currentNode="Obserwowane działy"
      posts={posts?.posts || []}
    />
  );
}
