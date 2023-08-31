import { notFound } from "next/navigation";
import PostsPage from "../../components/PostsPage";
import { PageProps } from "../../components/types/PageProps";
import { getFollowedUsersPosts } from "@/app/actions/posts/getFollowedUsersPosts";

export default async function Home(props: PageProps) {
  const posts = await getFollowedUsersPosts({
    params: { index: 1 },
    searchParams: props.searchParams,
  });

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
