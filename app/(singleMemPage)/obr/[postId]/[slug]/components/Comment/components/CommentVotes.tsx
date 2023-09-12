import clsx from "clsx";
import { useState } from "react";

type CommentVotesProps = {
  commentId: string;
  postId: string;
  defaultMethod?: "" | "PLUS" | "MINUS";
  votes: number;
};

const CommentVotes: React.FC<CommentVotesProps> = ({
  commentId,
  postId,
  defaultMethod = "",
  votes,
}) => {
  const [method, setMethod] = useState(defaultMethod);
  const [voteCount, setVoteCount] = useState<number>(votes);

  const btnClassName =
    "px-[11px] rounded-[3px] inline-flex items-center justify-center text-[23px] text-white font-bold h-[22px]";

  return (
    <div className="flex">
      <button
        className={clsx(
          btnClassName,
          method === "PLUS" ? "bg-[#94b425]" : "bg-[#313131]"
        )}
      >
        +
      </button>
      <span className="text-[14px] mx-[5px] text-white">{voteCount}</span>
      <button
        className={clsx(
          btnClassName,
          method === "MINUS" ? "bg-[#c03e3e]" : "bg-[#313131]"
        )}
      >
        -
      </button>
    </div>
  );
};

export default CommentVotes;
