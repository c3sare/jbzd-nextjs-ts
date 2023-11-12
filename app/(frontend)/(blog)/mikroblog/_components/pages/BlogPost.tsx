"use client";

import { useState, useRef, useImperativeHandle, MutableRefObject } from "react";

import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { IoLink } from "@react-icons/all-files/io5/IoLink";
import { IoMdStar } from "@react-icons/all-files/io/IoMdStar";
import { IoIosEye } from "@react-icons/all-files/io/IoIosEye";
import { IoMdWarning } from "@react-icons/all-files/io/IoMdWarning";
import { IoIosMore } from "@react-icons/all-files/io/IoIosMore";

import ActionButton from "./components/post/ActionButton";
import MessageBox from "./components/post/MessageBox";
import AvatarBox from "./components/post/AvatarBox";
import BlogPostHeader from "./components/post/header/BlogPostHeader";
import Comment from "./components/post/comment/Comment";
import clsx from "clsx";
import { BlogPostType } from "../../(tabs)/(najnowsze)/_types/BlogPost";
import Survey from "./components/post/survey/Survey";
import MoreCommentsBtn from "./components/post/comment/MoreCommentsBtn";
import CommentForm from "./components/commentForm/CommentForm";
import { getMoreComments } from "./_actions/getMoreComments";

type BlogPostProps = {
  post: BlogPostType;
};

type CommentFormInputRefType = {
  focus: () => void;
  getCurrentValue: () => string;
  setValue: (value: string) => void;
};

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const [defaultCommentText, setDefaultCommentText] = useState<string>("");
  const [isVisibleCommentForm, setIsVisibleCommentForm] =
    useState<boolean>(false);
  const [comments, setComments] = useState<BlogPostType["children"]>([]);
  const [isExpandedPostOptions, setIsExpandedPostOptions] =
    useState<boolean>(false);
  const commentformInputRef = useRef<CommentFormInputRefType | null>(null);

  const handleReplyComment = (defaultValue: string) => {
    console.log("reply");
    if (isVisibleCommentForm) {
      const currentMessage = commentformInputRef.current?.getCurrentValue();
      if (currentMessage?.indexOf(defaultValue) === -1)
        commentformInputRef.current?.setValue(currentMessage);
    } else if (!isVisibleCommentForm) {
      setDefaultCommentText(defaultValue);
      setIsVisibleCommentForm(true);
    }
  };

  const handleGetMoreComments = async () => {
    const cursor = comments.slice(-1)[0]?.id || post.children.slice(-1)[0]?.id;

    if (cursor) {
      const newComments = await getMoreComments(post.id, cursor);
      setComments((prev) => [...prev, ...newComments]);
    }
  };

  return (
    <div className="relative mb-[25px] flex">
      <AvatarBox
        userId={post.authorId}
        username={post.author.username!}
        avatar={post.author.image!}
      />
      <div className="w-full md:w-[calc(100%_-_70px)] relative">
        <BlogPostHeader post={post} />
        <div className="clear-both relative p-[15px_15px_25px] bg-[#313131] group">
          {!!post.questionnaire && (
            <Survey questionnaire={post.questionnaire} />
          )}
          <MessageBox
            images={post.files.filter((item) => item.type === "IMAGE")}
            message={post.text}
          />
          <ul className="pt-4 transition-opacity duration-200 ease-in-out sm:opacity-0 group-hover:opacity-100">
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton
                onClick={() => {
                  if (commentformInputRef.current)
                    commentformInputRef.current.focus();

                  setIsVisibleCommentForm(true);
                }}
                icon={FaReply}
              >
                Odpowiedz
              </ActionButton>
            </li>
            <li className="float-left leading-[20px] mr-[15px]">
              <ActionButton
                href={`/mikroblog/post/${post.id}/${post.slug}`}
                icon={IoLink}
              >
                Link
              </ActionButton>
            </li>
            <li
              className={clsx(
                "float-left leading-[20px] mr-[15px]",
                !isExpandedPostOptions && "hidden md:block"
              )}
            >
              <ActionButton icon={IoMdStar}>Dodaj do ulubionych</ActionButton>
            </li>
            <li
              className={clsx(
                "float-left leading-[20px] mr-[15px]",
                !isExpandedPostOptions && "hidden md:block"
              )}
            >
              <ActionButton icon={IoIosEye}>Obserwuj</ActionButton>
            </li>
            <li
              className={clsx(
                "float-left leading-[20px] mr-[15px]",
                !isExpandedPostOptions && "hidden md:block"
              )}
            >
              <ActionButton icon={IoMdWarning}>Zgłoś</ActionButton>
            </li>
            {!isExpandedPostOptions && (
              <li className="float-left leading-[20px] mr-[15px] md:hidden">
                <ActionButton
                  icon={IoIosMore}
                  onClick={() => setIsExpandedPostOptions(true)}
                >
                  Więcej opcji
                </ActionButton>
              </li>
            )}
          </ul>
        </div>
        {post._count.children !== 0 && (
          <>
            <div className="pt-[20px] bg-[#313131]">
              <div>
                <ul className="px-[7.5px] w-full">
                  {[...post.children, ...comments].map((comment) => (
                    <Comment
                      handleReplyComment={handleReplyComment}
                      key={comment.id}
                      comment={comment}
                    />
                  ))}
                  {post._count.children > 3 &&
                    comments.length + 3 < post._count.children && (
                      <li className="w-full pb-[20px]">
                        <MoreCommentsBtn onClick={handleGetMoreComments} />
                      </li>
                    )}
                </ul>
              </div>
            </div>
          </>
        )}
        {isVisibleCommentForm && (
          <CommentForm
            postId={post.id}
            ref={
              commentformInputRef as unknown as MutableRefObject<HTMLTextAreaElement>
            }
            onClose={() => {
              setIsVisibleCommentForm(false);
              setDefaultCommentText("");
            }}
            defaultCommentText={defaultCommentText}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;
