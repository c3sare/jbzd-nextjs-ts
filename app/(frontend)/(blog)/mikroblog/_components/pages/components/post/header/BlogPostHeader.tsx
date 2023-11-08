import { useState } from "react";
import Link from "next/link";

import getTimeFromLastMessage from "@/app/(frontend)/(restSite)/wiadomosci-prywatne/rozmowa/[conversationId]/utils/getTimeFromLastMessage";
import VoteButton from "./components/VoteButton";
import Score from "./components/Score";
import Voters from "./components/Voters";
import { BlogPostType } from "@/app/(frontend)/(blog)/mikroblog/(tabs)/(najnowsze)/_types/BlogPost";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type BlogPostHeaderProps = {
  post: BlogPostType;
};

type VoteType = "" | "PLUS" | "MINUS";

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voters, setVoters] = useState(post.votes);
  const [vote, setVote] = useState<VoteType>(post.method);
  const [score, setScore] = useState<number>(post.score);
  const userProfileHref = `/mikroblog/uzytkownik/${post.author.username}`;

  const time = getTimeFromLastMessage(post.addTime);

  const handleVoteButton = (type: VoteType) => {
    setIsLoading(true);
    axios
      .post(`/api/blog/post/${post.id}/vote`, { method: type })
      .then((res) => res.data)
      .then((data) => {
        setVote(data.method);
        setScore(data.score);
        console.log(data);
        setVoters((prev) => {
          const newState = prev.filter(
            (voter) => voter.user.id !== session.data?.user?.id
          );
          if (data.method === "") return newState;
          else return [data.vote, ...newState];
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="bg-[#1f1f1f] p-[13px_7px_13px_15px] leading-[24px]">
      <Link
        className="min-w-[50px] mr-[20px] relative text-[18px] font-semibold text-white"
        href={userProfileHref}
      >
        {post.author.username}
      </Link>
      <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
        <Link href={userProfileHref}>{time}</Link>
      </time>
      <div className="flex items-center justify-center float-right">
        <Voters voters={voters} />
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

export default BlogPostHeader;
