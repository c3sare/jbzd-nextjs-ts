import getTimeFromLastMessage from "@/app/(frontend)/(restSite)/wiadomosci-prywatne/rozmowa/[conversationId]/utils/getTimeFromLastMessage";
import Link from "next/link";
import { useState } from "react";
import Voters from "../header/components/Voters";
import Score from "../header/components/Score";
import VoteButton from "../header/components/VoteButton";

type VoteType = "" | "PLUS" | "MINUS";

type CommentHeaderProps = {
  username?: string;
  addTime: Date;
  score?: number;
};

const CommentHeader: React.FC<CommentHeaderProps> = ({
  username,
  addTime,
  score = 0,
}) => {
  const [vote, setVote] = useState<VoteType>("");
  const userProfileHref = `/mikroblog/uzytkownik/${username}`;

  const time = getTimeFromLastMessage(addTime);

  const handleVoteButton = (type: VoteType) => {
    setVote((prev) => {
      if (prev === type) return "";

      return type;
    });
  };

  return (
    <div className="p-[10px_0_7px] relative leading-[24px] flex w-full">
      <Link
        className="w-auto text-[12px] font-semibold text-white mr-[15px] float-left"
        href={userProfileHref}
      >
        c3sare
      </Link>
      <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
        {time}
      </time>
      <div className="ml-auto flex items-center justify-end">
        <Voters voters={[]} />
        <Score value={score} />
        <VoteButton
          type="PLUS"
          vote={vote}
          onClick={() => handleVoteButton("PLUS")}
        />
        <VoteButton
          type="MINUS"
          vote={vote}
          onClick={() => handleVoteButton("MINUS")}
        />
      </div>
    </div>
  );
};

export default CommentHeader;
