import { notFound } from "next/navigation";
import PostsPage from "../../../../components/PostsPage";
import { TagPageProps } from "@/app/(frontend)/(restSite)/(withSidebar)/(postsPages)/components/types/TagPageProps";
import { getTagPagePosts } from "@/actions/posts/getTagPagePosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

type PageType = {
  params: Promise<TagPageProps["params"]>;
  searchParams: Promise<TagPageProps["searchParams"]>;
};

export default async function Home(props: PageType) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const posts = await getTagPagePosts({ params, searchParams });

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
