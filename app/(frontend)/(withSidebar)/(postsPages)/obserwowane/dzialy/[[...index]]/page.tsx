import { notFound } from "next/navigation";
import PostsPage from "../../../components/PostsPage";
import { PageProps } from "../../../components/types/PageProps";
import { getFollowedCategoriesPosts } from "@/actions/posts/getFollowedCategoriesPosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: PageProps) {
  const posts = await getFollowedCategoriesPosts(props);

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
