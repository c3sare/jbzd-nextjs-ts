import { notFound } from "next/navigation";
import PostsPage from "../../../components/PostsPage";
import { PageProps } from "../../../components/types/PageProps";
import { getFollowedCategoriesPosts } from "@/app/actions/posts/getFollowedCategoriesPosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: PageProps) {
  console.log(props);
  const posts = await getFollowedCategoriesPosts({
    params: { index: props.params?.index || [1] },
    searchParams: props.searchParams,
  });

  if (!posts) return notFound();

  return (
    <PostsPage
      page={posts.page}
      pagesCount={posts.pagesCount}
      pageSlug="obserwowane/dzialy"
      currentNode="Obserwowane działy"
      posts={posts.posts}
    />
  );
}
