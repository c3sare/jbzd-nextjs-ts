"use client";

import { FaComment } from "@react-icons/all-files/fa/FaComment";
import CommentType from "../types/CommentType";
import AddCommentForm from "./Comment/components/AddCommentForm";
import clsx from "clsx";
import CommentsList from "./CommentsList";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type CommentsSectionProps = {
  avatar: string;
  comments: CommentType[];
  commentsCount: number;
  postId: string;
};

const sortMethods = ["best", "new"] as const;

type SortType = (typeof sortMethods)[number];

const CommentSection: React.FC<CommentsSectionProps> = ({
  avatar = "/images/avatars/default.jpg",
  comments,
  commentsCount,
  postId,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const persistentScroll = localStorage.getItem("persistentScroll");
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(persistentScroll) });

    if (Number(persistentScroll) === window.scrollY)
      localStorage.removeItem("persistentScroll");
  }, [searchParams]);

  const sort = sortMethods.includes(searchParams.get("sort") as SortType)
    ? searchParams.get("sort")
    : "best";

  const isActiveSortBest = sort === "best";

  const isActiveSortNew = sort === "new";

  const handleChangeSort = (method: "best" | "new") => {
    localStorage.setItem("persistentScroll", window.scrollY.toString());
    router.push(`?sort=${method}`);
  };

  return (
    <div className="md:ml-[45px] mx-auto w-full max-w-[600px]">
      <AddCommentForm postId={postId} avatar={avatar} />
      <div>
        <header className="max-w-[600px] bg-[#1f1f1f] h-[60px] flex justify-between items-center px-[20px] m-[10px_0_5px_0]">
          <span className="relative flex items-center text-white">
            <FaComment className="mr-2" />
            <span>{commentsCount} komenatrzy</span>
          </span>
          <div>
            <button
              onClick={(e) => handleChangeSort("best")}
              className={clsx(
                "ml-[20px] inline-block",
                isActiveSortBest ? "text-[#c03e3e]" : "text-white"
              )}
            >
              najlepsze
            </button>
            <button
              onClick={(e) => handleChangeSort("new")}
              className={clsx(
                "ml-[20px] inline-block",
                isActiveSortNew ? "text-[#c03e3e]" : "text-white"
              )}
            >
              najnowsze
            </button>
          </div>
        </header>
        <CommentsList comments={comments} />
      </div>
    </div>
  );
};

export default CommentSection;
