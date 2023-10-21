import Link from "next/link";

import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";
import getTimeFromLastMessage from "@/app/(frontend)/wiadomosci-prywatne/rozmowa/[conversationId]/utils/getTimeFromLastMessage";

type BlogPostHeaderProps = {
  username?: string;
  addTime: Date;
  score?: number;
};

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  username,
  addTime,
  score = 0,
}) => {
  const userProfileHref = `/mikroblog/uzytkownik/${username}`;

  const time = getTimeFromLastMessage(addTime);

  return (
    <div className="bg-[#1f1f1f] p-[13px_7px_13px_15px] leading-[24px]">
      <Link
        className="min-w-[50px] mr-[20px] relative text-[18px] font-semibold text-white"
        href={userProfileHref}
      >
        c3sare
      </Link>
      <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
        <Link href={userProfileHref}>{time}</Link>
      </time>
      <div className="flex items-center justify-center float-right">
        <div className="mr-[7px] text-[#6e7578] text-[20px] cursor-pointer ml-0.5">
          <FaQuestionCircle />
        </div>
        <p className="mr-2 text-[14px] font-semibold text-[#6e7578] leading-[24px] mb-0 ml-0.5">
          {score}
        </p>
        <button className="w-[24px] h-[24px] bg-[#6e7578] p-0 leading-[24px] ml-[2px] inline-block text-center text-[11px] font-semibold transition-all duration-200 ease-in-out">
          <BiPlus size={24} />
        </button>
        <button className="w-[24px] h-[24px] bg-[#6e7578] p-0 leading-[24px] ml-[2px] inline-block text-center text-[11px] font-semibold transition-all duration-200 ease-in-out">
          <BiMinus size={24} />
        </button>
      </div>
    </div>
  );
};

export default BlogPostHeader;
