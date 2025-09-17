import { notFound } from "next/navigation";
import { PageProps } from "../../components/types/PageProps";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import Posts from "../../components/Posts";
import Pagination from "../../components/Pagination";
import { getFavouritePagePosts } from "@/actions/posts/getFavouritePagePosts";
import { getPremium } from "@/actions/getPremium";
import HeaderPremium from "../components/HeaderPremium";

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
  const posts = await getFavouritePagePosts({ params, searchParams });

  if (!posts) return notFound();

  const { isPremium } = await getPremium();

  return (
    <>
      <Breadcrumb
        currentNode={posts.page === 1 ? "Ulubione" : "Strona " + posts.page}
      >
        <Link href={`/`}>Strona główna</Link>
        {posts.page > 1 ? <Link href="/ulubione">Ulubione</Link> : null}
      </Breadcrumb>
      <HeaderPremium isPremium={isPremium} />
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
