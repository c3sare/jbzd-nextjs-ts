"use client";

import type {
  ActionedBlogTag,
  BlogPostVote,
  ObservedBlogPost,
} from "@prisma/client";
import type { Session } from "next-auth";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type BlogContextType = {
  data: {
    observedPosts: ObservedBlogPost[];
    votedPosts: BlogPostVote[];
    actionedTags: ActionedBlogTag[];
    session: Required<Session>["user"];
  };
  method: {
    observedPost: {
      add: (post: ObservedBlogPost) => void;
      remove: (id: string) => void;
    };
    postVote: {
      add: (vote: BlogPostVote) => void;
      remove: (postId: string) => void;
      getMethod: (postId: string) => "" | "PLUS" | "MINUS";
    };
    actionedTag: {
      add: (actionedTag: ActionedBlogTag) => void;
      remove: (id: string) => void;
    };
  };
};

export const BlogContext = createContext<BlogContextType | null>(null);

export const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (context === null) throw new Error("Context isn't ready yet!");

  return context;
};

export const BlogContextProvider: React.FC<
  PropsWithChildren & { value: BlogContextType["data"] }
> = ({ children, value }) => {
  const [data, setData] = useState<BlogContextType["data"]>(value);

  const method = {
    observedPost: {
      add: (post: ObservedBlogPost) =>
        setData((prev) => ({
          ...prev,
          observedPosts: [post, ...prev.observedPosts],
        })),
      remove: (id: string) =>
        setData((prev) => ({
          ...prev,
          observedPosts: prev.observedPosts.filter((item) => item.id !== id),
        })),
    },
    postVote: {
      add: (vote: BlogPostVote) =>
        setData((prev) => ({
          ...prev,
          votedPosts: [vote, ...prev.votedPosts],
        })),
      remove: (postId: string) =>
        setData((prev) => ({
          ...prev,
          votedPosts: prev.votedPosts.filter((item) => item.postId !== postId),
        })),
      getMethod: (postId: string) =>
        data.votedPosts.find((vote) => vote.postId === postId)?.method || "",
    },
    actionedTag: {
      add: (actionedTag: ActionedBlogTag) =>
        setData((prev) => ({
          ...prev,
          actionedTags: [actionedTag, ...prev.actionedTags],
        })),
      remove: (id: string) =>
        setData((prev) => ({
          ...prev,
          actionedTags: prev.actionedTags.filter((item) => item.id !== id),
        })),
    },
  };

  return (
    <BlogContext.Provider value={{ data, method }}>
      {children}
    </BlogContext.Provider>
  );
};
