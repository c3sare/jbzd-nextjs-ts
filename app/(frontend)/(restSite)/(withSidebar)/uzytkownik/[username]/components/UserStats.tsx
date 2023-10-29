"use client";

import { UserProfile } from "@prisma/client";
import { AiFillFlag } from "@react-icons/all-files/ai/AiFillFlag";
import { AiFillPicture } from "@react-icons/all-files/ai/AiFillPicture";
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import format from "date-fns/format";

type UserStatsProps = {
  user: UserProfile;
};

const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const accountCreateDate = format(user.createdAt, "dd.MM.yyyy");

  return (
    <section className="flex gap-4 mb-[10px] justify-center sm:justify-normal">
      <div className="flex items-center">
        <AiFillPicture size={20} color="#888888" />
        <span className="ml-2">
          {user.posts} / {user.acceptedPosts}
        </span>
      </div>
      <div className="flex items-center">
        <FaComment size={20} color="#888888" />
        <span className="ml-2">{user.comments}</span>
      </div>
      <div className="flex items-center">
        <AiFillFlag size={20} color="#888888" />
        <span className="ml-2">{accountCreateDate}</span>
      </div>
    </section>
  );
};

export default UserStats;
