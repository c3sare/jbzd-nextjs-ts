"use client";

import Post from "@/app/(postsPages)/components/Post/Post";
import { PostType } from "@/app/(postsPages)/components/types/PostType";
import { useState } from "react";

type SinglePostProps = {
  post: PostType;
};

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const [author, setAuthor] = useState<PostType["author"] | undefined>(
    post.author
  );

  const setSpears = (count: number) => {
    setAuthor((prevState) => {
      if (!prevState) return undefined;

      const newState = { ...prevState };
      newState.spears = count;
      return newState;
    });
  };

  const setAuthorMethod = (method: "FOLLOW" | "BLOCK") => {
    setAuthor((prevState) => {
      if (!prevState) return undefined;

      const newState = { ...prevState };
      newState.action = method;

      return newState;
    });
  };

  // setAuthorMethod: (method: "FOLLOW" | "BLOCK") => void;

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
