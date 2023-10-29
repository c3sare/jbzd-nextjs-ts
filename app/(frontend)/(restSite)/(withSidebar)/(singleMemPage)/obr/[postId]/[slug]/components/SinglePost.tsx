"use client";

import Post from "@/app/(frontend)/(restSite)/(withSidebar)/(postsPages)/components/Post/Post";
import { PostType } from "@/app/(frontend)/(restSite)/(withSidebar)/(postsPages)/components/types/PostType";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type SinglePostProps = {
  post: PostType;
};

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const pathname = usePathname();
  const scrolledToId = useRef<boolean>(false);
  const [author, setAuthor] = useState<PostType["author"] | undefined>(
    post.author
  );

  useEffect(() => {
    const hashIndex = pathname.indexOf("#");

    if (hashIndex > -1 && !scrolledToId.current) {
      const id = pathname.slice(hashIndex + 1);
      const comment = document.getElementById(id);
      if (comment) {
        comment.scrollIntoView();
        scrolledToId.current = true;
      }
    }
  }, [post, pathname]);

  const setSpears = useCallback((authorId: string, count: number) => {
    setAuthor((prevState) => {
      if (!prevState) return undefined;

      const newState = { ...prevState };
      newState.spears = count;
      return newState;
    });
  }, []);

  const setAuthorMethod = useCallback(
    (id: string, method: "FOLLOW" | "BLOCK") => {
      setAuthor((prevState) => {
        if (!prevState) return undefined;

        const newState = { ...prevState };
        newState.action = method;

        return newState;
      });
    },
    []
  );

  return (
    <Post
      isPostPage
      setSpears={setSpears}
      setAuthorMethod={setAuthorMethod}
      post={post}
      author={author}
    />
  );
};

export default SinglePost;
