import { notFound } from "next/navigation";
import PostsPage from "../../../components/PostsPage";
import { TagPageProps } from "@/app/(withSidebar)/(postsPages)/components/types/TagPageProps";
import { getTagPagePosts } from "@/app/actions/posts/getTagPagePosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: TagPageProps) {
  const posts = await getTagPagePosts({
    params: { index: "1", tagId: props.params.tagId, slug: props.params.slug },
    searchParams: props.searchParams,
  });

  if (!posts) return notFound();

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
