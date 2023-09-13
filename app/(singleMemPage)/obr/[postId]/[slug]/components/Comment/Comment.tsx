"use client";

import Image from "next/image";
import Link from "next/link";
import CommentButton from "./components/CommentButton";
import ArticleTime from "@/app/(postsPages)/components/Post/components/ArticleTime";
import Badge from "@/app/(postsPages)/components/Post/components/Badge";
import CommentVotes from "./components/CommentVotes";
import { HTMLAttributes, useCallback, useMemo, useRef, useState } from "react";
import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { FaQuoteLeft } from "@react-icons/all-files/fa/FaQuoteLeft";
import CommentType from "../../types/CommentType";
import AddCommentForm from "./components/AddCommentForm";
import parseContentToRC from "./utils/parseContentToRC";
import BadgeButton from "./components/BadgeButton";
import FavouriteButton from "./components/FavouriteButton";

type Badges = {
  rock: number;
  silver: number;
  gold: number;
};

type CommentProps = {
  comment: CommentType;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  isLoggedIn: boolean;
  userPage?: boolean;
};

const Comment: React.FC<CommentProps> = ({
  comment,
  className,
  isLoggedIn,
  userPage,
}) => {
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

  const closeForm = useCallback(() => {
    setShowAddComment(false);
  }, [setShowAddComment]);

  const votePlus = comment.pluses?.length === 1 ? "plus" : null;
  const voteMinus = comment.minuses?.length === 1 ? "minus" : null;

  const voteMethod = votePlus || voteMinus || "";

  const isFavouriteComment = comment.favouriteList?.length === 1;

  return (
    <div className={className} id={comment.id}>
      <div className="flex relative p-[10px]">
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
              defaultMethod={voteMethod}
              isLoggedIn={isLoggedIn}
            />
          </header>
          <div className="text-[14px] text-white my-[5px] break-words overflow-hidden">
            {commentContent}
          </div>
          {isLoggedIn && (
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
              <BadgeButton
                setBadge={setBadge}
                postId={comment.postId}
                commentId={comment.id}
              />
              <FavouriteButton
                postId={comment.postId}
                defaultActive={isFavouriteComment}
                commentId={comment.id}
              />
            </div>
          )}
          {userPage && comment.post && (
            <div className="flex justify-end w-full mt-1 items-ceter">
              <Link
                className="block text-[10px] text-[#777]"
                href={`/obr/${comment.post.id}/${comment.post.slug}#${comment.id}`}
              >
                przejdź do posta
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="ml-[45px]">
        {showAddComment && (
          <AddCommentForm
            commentId={comment.precedentId || comment.id}
            postId={comment.postId}
            avatar={comment.author.image!}
            defaultValue={defaultValue.current}
            closeForm={closeForm}
          />
        )}
        {comment?.subcomments &&
          comment.subcomments.map((subcomment) => (
            <Comment
              className="border-l border-l-white"
              key={subcomment.id}
              isLoggedIn={isLoggedIn}
              comment={subcomment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
