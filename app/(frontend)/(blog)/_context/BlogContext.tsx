"use client";

import type { ActionedBlogTag } from "@prisma/client";
import type { Session } from "next-auth";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

export type ActionedBlogTagWithTag = ActionedBlogTag & {
  tag: {
    id: string;
    name: string;
    slug: string;
    _count: {
      posts: number;
    };
  };
};

type BlogContextType = {
  data: {
    actionedTags: ActionedBlogTagWithTag[];
    session: Required<Session>["user"];
  };
  method: {
    actionedTag: {
      add: (actionedTag: ActionedBlogTagWithTag) => void;
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
    actionedTag: {
      add: (actionedTag: ActionedBlogTagWithTag) =>
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
