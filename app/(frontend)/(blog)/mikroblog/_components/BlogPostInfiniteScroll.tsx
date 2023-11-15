"use client";

import { useState } from "react";
import { BlogPostType } from "../(tabs)/_types/BlogPost";
import BlogPost from "./pages/BlogPost";
import LoadMore from "./LoadMore";

type ScrollContainerProps = {
  initalPosts: BlogPostType[];
  getPostsFunc: (lastPostId: string | undefined) => Promise<BlogPostType[]>;
};

const BlogPostInfiniteScroll: React.FC<ScrollContainerProps> = ({
  initalPosts,
  getPostsFunc,
}) => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [posts, setPosts] = useState<BlogPostType[]>(initalPosts);

  const loadMore = async () => {
    const newPosts = await getPostsFunc(
      posts[posts.length - 1]?.id || undefined
    );
    if (newPosts.length === 0) return setIsEnd(true);
    setPosts((prev) => [...prev, ...newPosts]);
  };

  return (
    <>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      <LoadMore loadMore={loadMore} isEnd={isEnd} />
    </>
  );
};

export default BlogPostInfiniteScroll;
