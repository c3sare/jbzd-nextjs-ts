import { getSession } from "@/actions/getSession";
import { notFound } from "next/navigation";
import prisma from "@/libs/prismadb";
import BlogPost from "../../_components/pages/BlogPost";
import { getIncludePostData } from "../../_utils/getIncludePostData";
import CommentTag, { CommentTypeTag } from "./_components/CommentTag";
import { BlogPostType } from "../../(tabs)/_types/BlogPost";
import { transformPosts } from "../../(tabs)/_actions/getPosts";

type Params = {
  params: {
    slug: string;
  };
};

const TagPage = async ({ params: { slug } }: Params) => {
  if (!slug) return notFound();

  const session = await getSession();

  if (!session?.user) return notFound();

  const tag = await prisma.blogTag.findUnique({
    where: {
      slug,
    },
    include: {
      posts: {
        include: {
          ...getIncludePostData(session.user.id),
          parent: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: {
          addTime: "desc",
        },
      },
    },
  });

  if (!tag) return notFound();

  const posts = transformPosts(tag.posts, session.user.id);

  type TagPosts = typeof posts;

  type TagPost = TagPosts[number] & {
    parent?: BlogPostType;
  };

  const tagPosts: TagPost[] = posts;

  return (
    <div className="w-full md:w-2/3 relative min-h-[1px] px-[15px] ">
      <h1 className="text-white text-[2em] my-[0.67em] font-bold">
        Tag: {tag.name}
      </h1>
      {tagPosts.map((post) =>
        post?.parent ? (
          <CommentTag
            key={post.id}
            comment={post as unknown as CommentTypeTag}
          />
        ) : (
          <BlogPost key={post.id} post={post} />
        )
      )}
    </div>
  );
};

export default TagPage;
