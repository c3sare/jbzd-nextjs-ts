import Pagination from "@/app/(withSidebar)/(postsPages)/components/Pagination";
import Posts from "@/app/(withSidebar)/(postsPages)/components/Posts";
import { getUserPagePosts } from "@/app/actions/posts/getUserPagePosts";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";

export type PostsTabProps = {
  params: {
    username: string;
    index: string;
  };
};

const UserProfilePage: React.FC<PostsTabProps> = async (props) => {
  const posts = await getUserPagePosts({
    params: { username: props.params.username, index: "1" },
  });

  if (!posts) return notFound();

  return (
    <div>
      <Breadcrumb currentNode="Dzidy">
        <Link href="/">Strona główna</Link>
        <Link href={`/uzytkownik/${props.params.username}`}>
          {props.params.username}
        </Link>
      </Breadcrumb>
      <Posts posts={posts.posts} />
      {posts.pagesCount > 1 && (
        <Pagination
          pageName={`uzytkownik/${props.params.username}`}
          currentPage={posts.page}
          allPages={posts.pagesCount}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
