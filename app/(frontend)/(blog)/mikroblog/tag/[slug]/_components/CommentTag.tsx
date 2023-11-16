"use client";

import Link from "next/link";
import AvatarBox from "../../../_components/pages/components/post/AvatarBox";
import Comment from "../../../_components/pages/components/post/comment/Comment";
import { MutableRefObject, useRef, useState } from "react";
import CommentForm from "../../../_components/pages/components/commentForm/CommentForm";
import { BlogPostType } from "../../../(tabs)/_types/BlogPost";

export type CommentTypeTag = BlogPostType["children"][number] & {
  parent: BlogPostType;
};

type CommentTagProps = {
  comment: CommentTypeTag;
};

const CommentTag: React.FC<CommentTagProps> = ({ comment }) => {
  const commentformInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [defaultCommentText, setDefaultCommentText] = useState<string>("");
  const [isVisibleCommentForm, setIsVisibleCommentForm] =
    useState<boolean>(false);

  const handleReplyComment = (defaultValue: string) => {
    if (isVisibleCommentForm) {
      const currentMessage = commentformInputRef.current?.value;
      if (currentMessage?.indexOf(defaultValue) === -1)
        commentformInputRef.current!.value = currentMessage;
    } else if (!isVisibleCommentForm) {
      setDefaultCommentText(defaultValue);
      setIsVisibleCommentForm(true);
    }
  };

  return (
    <div className="relative mb-[25px] w-full flex">
      <AvatarBox
        userId={comment.parent.authorId}
        username={comment.parent.author.username!}
        avatar={comment.parent.author.image!}
      />
      <div className="w-full md:w-[calc(100%_-_70px)] relative flex-col">
        <div className="text-center p-[15px_15px_25px] bg-[#313131] relative w-full">
          <Link
            className="flex items-center justify-center text-[20px] text-white flex-col"
            href={`/mikroblog/post/${comment.parent.id}/${comment.parent.slug}`}
          >
            <span>{"• • •"}</span>
            <span className="block text-[9px]">(pokaż post)</span>
          </Link>
        </div>
        <div className="group bg-[#313131] px-2">
          <Comment
            handleReplyComment={() =>
              handleReplyComment(`@[${comment.author.username!}]`)
            }
            comment={comment}
          />
        </div>
        {isVisibleCommentForm && (
          <CommentForm
            postId={comment.parentId || comment.id}
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

export default CommentTag;
