import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type CommentVotesProps = {
  commentId: string;
  postId: string;
  defaultMethod?: "" | "plus" | "minus";
  votes: number;
  isLoggedIn: boolean;
};

const CommentVotes: React.FC<CommentVotesProps> = ({
  commentId,
  postId,
  defaultMethod = "",
  votes,
  isLoggedIn,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [method, setMethod] = useState(defaultMethod);
  const [voteCount, setVoteCount] = useState<number>(votes);

  const btnClassName =
    "px-[11px] rounded-[3px] inline-flex items-center justify-center text-[23px] text-white font-bold h-[22px]";

  const handleClickVote = (method: "plus" | "minus") => {
    setIsLoading(true);
    axios
      .post(`/api/post/${postId}/comment/${commentId}/vote`, { type: method })
      .then((res) => {
        if (res.data?.voted) {
          const { count, type } = res.data;
          setMethod(type);
          setVoteCount(count);
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy dodawaniu głosu!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex ml-auto md:ml-0">
      {isLoggedIn && (
        <button
          disabled={isLoading}
          className={clsx(
            btnClassName,
            method === "plus" ? "bg-[#94b425]" : "bg-[#313131]"
          )}
          onClick={() => handleClickVote("plus")}
        >
          +
        </button>
      )}
      <span className="text-[14px] mx-[5px] text-white">{voteCount}</span>
      {isLoggedIn && (
        <button
          disabled={isLoading}
          className={clsx(
            btnClassName,
            method === "minus" ? "bg-[#c03e3e]" : "bg-[#313131]"
          )}
          onClick={() => handleClickVote("minus")}
        >
          -
        </button>
      )}
    </div>
  );
};

export default CommentVotes;
