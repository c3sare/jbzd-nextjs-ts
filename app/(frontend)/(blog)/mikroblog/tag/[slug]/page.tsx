import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import prisma from "@/libs/prismadb";
import { getTagPosts } from "./_actions/getTagPosts";
import BlogPostInfiniteScroll from "../../_components/BlogPostInfiniteScroll";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

const TagPage = async ({ params }: Params) => {
  const { slug } = await params;
  if (!slug) return notFound();

  const session = await getSession();

  if (!session?.user) return notFound();

  const tag = await prisma.blogTag.findUnique({
    where: {
      slug,
    },
  });

  if (!tag) return notFound();

  const posts = await getTagPosts({ slug });

  async function getPostsFunc(cursor?: string) {
    "use server";
    const tagPosts = await getTagPosts({ slug, cursor });

    return tagPosts;
  }

  return (
    <div className="w-full md:w-2/3 relative min-h-[1px] px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">
        Tag: {tag.name}
      </h1>
      <BlogPostInfiniteScroll initalPosts={posts} getPostsFunc={getPostsFunc} />
    </div>
  );
};

export default TagPage;
