"use client";

import { useState } from "react";
import Link from "next/link";
import { TfiCup } from "react-icons/tfi";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";

type UserRankProps = {
  id: string;
  spears: number;
  rank: number;
  email: string;
};

const UserRank: React.FC<UserRankProps> = ({ id, spears, rank, email }) => {
  const session = useSession();
  const [spearCount, setSpearCount] = useState<number>(spears || 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoggedIn = session?.status === "authenticated";
  const loggedEmail = session?.data?.user?.email;

  const handleClickPlusButton = (id: string) => {
    setIsLoading(true);
    axios
      .post("/api/user/vote/" + id)
      .then((data) => setSpearCount(data.data.count))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-[max-content] sm:max-w-[125px] rounded-lg bg-[#1f1f1f] p-[5px_15px] mt-[10px] flex sm:block justify-between items-center flex-row">
      <div className="flex flex-row items-center sm:justify-between relative">
        <Image
          src="/images/spear.png"
          alt="Dzida"
          width={22}
          height={22}
          className="mr-[25px] sm:mr-0"
        />
        <span className="font-bold text-[22px]">{spearCount}</span>
        {isLoggedIn && loggedEmail !== email && (
          <button
            onClick={() => handleClickPlusButton(id)}
            disabled={isLoading}
            className="absolute right-[-28px] top-[5px] w-[25px] h-[25px] text-[24px] m-0 shadow-[0_2px_3px_#000] rounded-full flex justify-center items-center font-bold bg-[#c03e3e]"
          >
            +
          </button>
        )}
      </div>
      <Link
        href="/ranking"
        className="flex flex-row items-center sm:justify-between"
      >
        <TfiCup className="text-[22px] mr-[25px] sm:mr-0" />
        <span className="font-bold text-[22px]">{rank}</span>
      </Link>
    </div>
  );
};

export default UserRank;
