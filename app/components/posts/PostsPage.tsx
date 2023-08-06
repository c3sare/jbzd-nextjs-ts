import { Post } from "@prisma/client";
import Breadcrumb from "../Breadcrumb";
import Link from "next/link";
import Header from "./components/Header";

type PostsPageProps = {
  posts: Post[];
  currentNode: string;
  page: number;
  pageSlug: string;
};

const PostsPage: React.FC<PostsPageProps> = ({
  posts,
  currentNode,
  page,
  pageSlug,
}) => {
  return (
    <>
      <Breadcrumb currentNode={page === 1 ? currentNode : "Strona " + page}>
        {page > 1 && <Link href={`/${pageSlug}`}>{currentNode}</Link>}
      </Breadcrumb>
      <Header />
    </>
  );
};

export default PostsPage;
