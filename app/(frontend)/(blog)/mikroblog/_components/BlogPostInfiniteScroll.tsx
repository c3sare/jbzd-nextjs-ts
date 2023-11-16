"use client";

import { useEffect, useState } from "react";
import { BlogPostType } from "../(tabs)/_types/BlogPost";
import BlogPost from "./pages/BlogPost";
import LoadMore from "./LoadMore";
import { useSearchParams } from "next/navigation";
import CommentTag, {
  CommentTypeTag,
} from "../tag/[slug]/_components/CommentTag";

type ScrollContainerProps = {
  initalPosts: BlogPostType[];
  getPostsFunc: (lastPostId: string | undefined) => Promise<BlogPostType[]>;
  isEnd?: boolean;
};

const BlogPostInfiniteScroll: React.FC<ScrollContainerProps> = ({
  initalPosts,
  getPostsFunc,
  isEnd: isEndPosts,
}) => {
  const params = useSearchParams();
  const [isEnd, setIsEnd] = useState<boolean>(!!isEndPosts);
  const [posts, setPosts] = useState<BlogPostType[]>(initalPosts);

  useEffect(() => {
    setPosts(initalPosts);
    setIsEnd(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const loadMore = async () => {
    const cursor = posts[posts.length - 1]?.id;
    if (!cursor) return setIsEnd(true);
    const newPosts = await getPostsFunc(cursor);
    if (newPosts.length === 0) return setIsEnd(true);
    setPosts((prev) => [...prev, ...newPosts]);
  };

  return (
    <>
      {posts.map((post) =>
        post.parentId ? (
          <CommentTag
            key={post.id}
            comment={post as unknown as CommentTypeTag}
          />
        ) : (
          <BlogPost key={post.id} post={post} />
        )
      )}
      <LoadMore loadMore={loadMore} isEnd={isEnd} />
    </>
  );
};

export default BlogPostInfiniteScroll;
