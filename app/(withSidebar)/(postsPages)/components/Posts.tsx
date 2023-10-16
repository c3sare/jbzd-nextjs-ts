"use client";

import { useCallback, useState } from "react";
import { PostType } from "./types/PostType";
import PostComponent from "@/app/(withSidebar)/(postsPages)/components/Post/Post";
import deleteAuthorDuplicates from "@/utils/deleteAuthorDuplicates";

type PostsProps = {
  posts: PostType[];
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [authors, setAuthors] = useState<PostType["author"][]>(
    deleteAuthorDuplicates(posts.map((item) => item.author))
  );

  const setSpears = useCallback((id: string, count: number) => {
    setAuthors((prevState) => {
      const newState = [...prevState];

      return newState.map((item) => {
        if (item!.id === id) {
          item!.spears = count;
        }
        return item;
      });
    });
  }, []);

  const setAuthorMethod = useCallback(
    (id: string, method: "FOLLOW" | "BLOCK") => {
      setAuthors((prevState) => {
        const newState = [...prevState];

        return newState.map((item) => {
          if (item!.id === id) {
            item!.action = method;
          }
          return item;
        });
      });
    },
    []
  );

  const setSpearsCount = useCallback(
    (authorId: string, count: number) => {
      setSpears(authorId, count);
    },
    [setSpears]
  );

  return posts.map((post) => {
    const author = authors.find((item) => item!.id === post.authorId);

    return (
      <PostComponent
        key={post.id}
        post={post}
        setSpears={setSpearsCount}
        setAuthorMethod={setAuthorMethod}
        author={author}
      />
    );
  });
};

export default Posts;
