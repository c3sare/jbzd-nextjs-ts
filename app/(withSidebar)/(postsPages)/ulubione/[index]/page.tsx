import { notFound } from "next/navigation";
import { PageProps } from "../../components/types/PageProps";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import Posts from "../../components/Posts";
import Pagination from "../../components/Pagination";
import { getFavouritePagePosts } from "@/app/actions/posts/getFavouritePagePosts";

export const fetchCache = "force-no-store";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function Home(props: PageProps) {
  const posts = await getFavouritePagePosts(props);

  if (!posts || posts.posts.length === 0) return notFound();

  return (
    <>
      <Breadcrumb
        currentNode={posts.page === 1 ? "Ulubione" : "Strona " + posts.page}
      >
        <Link href={`/`}>Strona główna</Link>
        {posts.page > 1 ? <Link href="/ulubione">Ulubione</Link> : null}
      </Breadcrumb>
      <Posts posts={posts.posts} />
      {posts.pagesCount > 1 && (
        <Pagination
          pageName="ulubione"
          currentPage={posts.page}
          allPages={posts.pagesCount}
        />
      )}
    </>
  );
}
