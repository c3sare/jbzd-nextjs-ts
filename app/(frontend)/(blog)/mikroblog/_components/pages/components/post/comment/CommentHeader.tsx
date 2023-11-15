import getTimeFromLastMessage from "@/app/(frontend)/(restSite)/wiadomosci-prywatne/rozmowa/[conversationId]/utils/getTimeFromLastMessage";
import Link from "next/link";
import Voters from "../header/components/Voters";
import Score from "../header/components/Score";
import VoteButton from "../header/components/VoteButton";
import { BlogPostType } from "@/app/(frontend)/(blog)/mikroblog/(tabs)/_types/BlogPost";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type VoteType = "" | "PLUS" | "MINUS";

type CommentHeaderProps = {
  comment: BlogPostType["children"][number];
};

const CommentHeader: React.FC<CommentHeaderProps> = ({ comment }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vote, setVote] = useState<VoteType>(comment.method);
  const [score, setScore] = useState<number>(comment.score);
  const userProfileHref = `/mikroblog/uzytkownik/${comment.author.username}`;

  const time = getTimeFromLastMessage(new Date(comment.addTime));

  const handleVoteButton = (type: VoteType) => {
    setIsLoading(true);
    axios
      .post(`/api/blog/post/${comment.id}/vote`, { method: type })
      .then((res) => res.data)
      .then((data) => {
        setScore(data.score);
        setVote(data.method);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-[10px_0_7px] relative leading-[24px] flex w-full">
      <Link
        className="w-auto text-[12px] font-semibold text-white mr-[15px] float-left"
        href={userProfileHref}
      >
        {comment.author.username}
      </Link>
      <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
        {time}
      </time>
      <div className="flex items-center justify-end ml-auto">
        <Voters method={vote} voters={comment.votes} />
        <Score isLoading={isLoading} value={score} />
        <VoteButton
          type="PLUS"
          vote={vote}
          disabled={isLoading}
          onClick={() => handleVoteButton("PLUS")}
        />
        <VoteButton
          type="MINUS"
          vote={vote}
          disabled={isLoading}
          onClick={() => handleVoteButton("MINUS")}
        />
      </div>
    </div>
  );
};

export default CommentHeader;
