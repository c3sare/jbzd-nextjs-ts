"use client";

import Image from "next/image";
import Link from "next/link";
import CommentButton from "./components/CommentButton";
import ArticleTime from "@/app/(postsPages)/components/Post/components/ArticleTime";
import Badge from "@/app/(postsPages)/components/Post/components/Badge";
import CommentVotes from "./components/CommentVotes";
import { HTMLAttributes, useMemo, useRef, useState } from "react";
import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { FaQuoteLeft } from "@react-icons/all-files/fa/FaQuoteLeft";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaAward } from "@react-icons/all-files/fa/FaAward";
import CommentType from "../../types/CommentType";
import AddCommentForm from "./components/AddCommentForm";
import parseContentToRC from "./utils/parseContentToRC";

type Badges = {
  rock: number;
  silver: number;
  gold: number;
};

type CommentProps = {
  comment: CommentType;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

const Comment: React.FC<CommentProps> = ({ comment, className }) => {
  const defaultValue = useRef<string>("");
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const [badge, setBadge] = useState<Badges>({
    rock: comment._count.rock,
    silver: comment._count.silver,
    gold: comment._count.gold,
  });

  const commentContent = useMemo(
    () => parseContentToRC(comment.content),
    [comment.content]
  );

  const votes = comment._count.pluses - comment._count.minuses;

  const handleToggleCommentForm = () => setShowAddComment((prev) => !prev);

  return (
    <div className={className}>
      <div className="flex mb-[10px] relative p-[10px]">
        <Link
          className="w-[33px] block mr-[15px]"
          href={`/uzytkownik/${comment.author.username}`}
        >
          <Image
            width={33}
            height={33}
            src={comment.author.image || "/images/avatars/default.jpg"}
            alt="Avatar"
          />
        </Link>
        <div className="flex-[1]">
          <header className="flex flex-row items-center">
            <div className="flex">
              <div className="text-white font-bold mr-[5px]">
                <Link href={`/uzytkownik/${comment.author.username}`}>
                  {comment.author.username}
                </Link>
              </div>
            </div>
            <div className="text-[#777] text-[12px] block font-bold">
              <ArticleTime addTime={comment.addTime} />
            </div>
            <div className="ml-auto mr-[10px]">
              <Badge name="rock" title="Kamienna dzida" count={badge.rock} />
              <Badge name="silver" title="Srebrna dzida" count={badge.silver} />
              <Badge name="gold" title="Złota dzida" count={badge.gold} />
            </div>
            <CommentVotes
              votes={votes}
              postId={comment.postId}
              commentId={comment.id}
            />
          </header>
          <p className="text-[14px] text-white my-[5px] break-words overflow-hidden">
            {commentContent}
          </p>
          <div className="flex items-center">
            <CommentButton
              onClick={() => {
                defaultValue.current = `@[${comment.author.username}] `;
                handleToggleCommentForm();
              }}
              icon={FaReply}
            >
              Odpowiedz
            </CommentButton>
            <CommentButton
              onClick={() => {
                defaultValue.current = `@[${comment.author.username}]\n[quote]${comment.content}[/quote]\n`;
                handleToggleCommentForm();
              }}
              icon={FaQuoteLeft}
            >
              Zacytuj
            </CommentButton>
            <CommentButton className="ml-auto" icon={FaAward}>
              Nagroda
            </CommentButton>
            <CommentButton icon={FaStar}>Ulubione</CommentButton>
          </div>
        </div>
      </div>
      <div className="ml-[45px]">
        {showAddComment && (
          <AddCommentForm
            commentId={comment.id}
            postId={comment.postId}
            avatar={comment.author.image!}
            defaultValue={defaultValue.current}
          />
        )}
        {comment?.subcomments &&
          comment.subcomments.map((subcomment) => (
            <Comment
              className="border-l border-l-white"
              key={subcomment.id}
              comment={subcomment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
