"use client";

import { useEffect, useState } from "react";
import { BlogPostType } from "../../_types/BlogPost";
import { getLatestPosts } from "../_actions/getLatestPosts";
import BlogPost from "../../../_components/pages/BlogPost";

const ScrollContainer = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    async function handleScroll() {
      const cursor = posts.length - 1;
      const postsToAdd = await getLatestPosts(
        cursor >= 0 ? posts[cursor]!.id : undefined
      );

      setPosts((prev) => [...prev, ...postsToAdd]);
    }

    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [posts]);

  return posts.map((post) => <BlogPost key={post.id} post={post} />);
};

export default ScrollContainer;
