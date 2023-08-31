import { notFound } from "next/navigation";
import PostsPage from "../../components/PostsPage";
import { PageProps } from "../../components/types/PageProps";
import { getFollowedCategoriesPosts } from "@/app/actions/posts/getFollowedCategoriesPosts";

export default async function Home(props: PageProps) {
  const posts = await getFollowedCategoriesPosts({
    params: { index: 1 },
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
