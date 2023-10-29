import { notFound } from "next/navigation";
import PostsPage from "../../../components/PostsPage";
import { PageProps } from "../../../components/types/PageProps";
import { getFollowedUsersPosts } from "@/actions/posts/getFollowedUsersPosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: PageProps) {
  const posts = await getFollowedUsersPosts(props);

  if (!posts) return notFound();

  return (
    <PostsPage
      page={posts.page}
      pagesCount={posts.pagesCount}
      pageSlug="obserwowane/uzytkownicy"
      currentNode="Obserwowani użytkownicy"
      posts={posts.posts}
    />
  );
}
