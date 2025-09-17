import Pagination from "@/app/(frontend)/(restSite)/(withSidebar)/(postsPages)/components/Pagination";
import Posts from "@/app/(frontend)/(restSite)/(withSidebar)/(postsPages)/components/Posts";
import { getUserPagePosts } from "@/actions/posts/getUserPagePosts";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";

export type PostsTabProps = {
  params: {
    username: string;
    index: string;
  };
};

type PostsTabPropsx = {
  params: Promise<PostsTabProps["params"]>;
};

const UserProfilePage: React.FC<PostsTabPropsx> = async (props) => {
  const params = await props.params;
  const posts = await getUserPagePosts({ params });

  if (!posts) return notFound();

  return (
    <div>
      <Breadcrumb currentNode="Dzidy">
        <Link href="/">Strona główna</Link>
        <Link href={`/uzytkownik/${params.username}`}>{params.username}</Link>
      </Breadcrumb>
      <Posts posts={posts.posts} />
      {posts.pagesCount > 1 && (
        <Pagination
          pageName={`uzytkownik/${params.username}`}
          currentPage={posts.page}
          allPages={posts.pagesCount}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
