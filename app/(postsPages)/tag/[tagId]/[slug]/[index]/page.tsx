import { notFound } from "next/navigation";
import PostsPage from "../../../../components/PostsPage";
import { TagPageProps } from "@/app/(postsPages)/components/types/TagPageProps";
import { getTagPagePosts } from "@/app/actions/posts/getTagPagePosts";

export default async function Home(props: TagPageProps) {
  const posts = await getTagPagePosts(props);

  if (!posts || posts.posts.length > 0) return notFound();

  return (
    <PostsPage
      page={posts.page}
      pagesCount={posts.pagesCount}
      pageSlug={`tag/${posts.tag.id}/${posts.tag.slug}`}
      currentNode={`Tag: #${posts.tag.name}`}
      posts={posts.posts}
    />
  );
}
