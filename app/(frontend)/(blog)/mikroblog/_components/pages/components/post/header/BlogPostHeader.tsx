import { useState } from "react";
import Link from "next/link";

import getTimeFromLastMessage from "@/app/(frontend)/(restSite)/wiadomosci-prywatne/rozmowa/[conversationId]/utils/getTimeFromLastMessage";
import VoteButton from "./components/VoteButton";
import Score from "./components/Score";
import Voters from "./components/Voters";
import { BlogPostType } from "@/app/(frontend)/(blog)/mikroblog/(tabs)/(najnowsze)/_types/BlogPost";

type BlogPostHeaderProps = {
  username?: string;
  addTime: Date;
  score?: number;
  voters: BlogPostType["votes"];
};

type VoteType = "" | "PLUS" | "MINUS";

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  username,
  addTime,
  score = 0,
  voters,
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
    <div className="bg-[#1f1f1f] p-[13px_7px_13px_15px] leading-[24px]">
      <Link
        className="min-w-[50px] mr-[20px] relative text-[18px] font-semibold text-white"
        href={userProfileHref}
      >
        {username}
      </Link>
      <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
        <Link href={userProfileHref}>{time}</Link>
      </time>
      <div className="flex items-center justify-center float-right">
        <Voters voters={voters} />
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

export default BlogPostHeader;
