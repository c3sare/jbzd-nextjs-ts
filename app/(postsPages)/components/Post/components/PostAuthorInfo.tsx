import { TfiCup } from "react-icons/tfi";
import type { PostType } from "../../types/PostType";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

type PostAuthorInfoProps = {
  author: Required<PostType>["author"];
};

const PostAuthorInfor: React.FC<PostAuthorInfoProps> = ({ author }) => {
  const [userAction, setUserAction] = useState<"FOLLOW" | "BLOCK" | "">(
    author.action || ""
  );
  const session = useSession();

  const username = session.data?.user?.username;

  const handleUserAction = (type: "FOLLOW" | "BLOCK") => {};

  const handleToggleSpear = () => {};

  return (
    <>
      <span className="text-[#777]"> przez </span>
      <span className="relative text-white group">
        {author.username}
        <div className="absolute z-[9999999] hidden top-full left-1/2 translate-x--1/2 group-hover:block">
          <div className="mt-[8px] w-[310px] rounded-[3px] bg-[#313131] flex before:w-0 before:h-0 before:content-normal before:block before:border-l-[5px] before:border-b-[5px] before:border-solid before:border-[transparent_transparent_#313131] before:absolute before:left-[10px] before:top-[-5px] p-[15px]">
            <div className="w-full flex flex-nowrap gap-[10px]">
              <div className="w-[45px] flex items-center">
                <Image
                  alt={author.username + " avatar"}
                  width={45}
                  height={45}
                  className="rounded-[50%]"
                  src={author.image || "/images/avatars/default.jpg"}
                />
              </div>
              <div className="flex-grow">
                <div className="text-white text-[14px] font-bold mb-[5px]">
                  {author.username}
                </div>
                <div className="flex justify-between flex-nowrap gap-[5px] mb-[5px] w-full">
                  <div className="pr-[30px] flex-grow bg-[#252525] leading-[38px] text-[20px] font-bold text-white items-center p-[0_8px] rounded-[4px] relative">
                    <span>
                      <Image
                        src="/images/spear.png"
                        width={22}
                        height={22}
                        alt="Dzida"
                      />
                    </span>
                    <span>{author.spears}</span>
                    {username !== author.username && (
                      <button onClick={handleToggleSpear}>+</button>
                    )}
                  </div>
                  <div className="pr-[30px] flex-grow bg-[#252525] leading-[38px] text-[20px] font-bold text-white items-center p-[0_8px] rounded-[4px] relative">
                    <span className="text-[22px]">
                      <TfiCup />
                    </span>
                    <span>{author.rank}</span>
                  </div>
                </div>
                <div>
                  <button
                    disabled={author.username === username}
                    className={clsx(userAction === "FOLLOW" && "")}
                    onClick={() => handleUserAction("FOLLOW")}
                  >
                    Obserwuj
                  </button>
                  <button
                    disabled={author.username === username}
                    className={clsx(userAction === "BLOCK" && "")}
                    onClick={() => handleUserAction("BLOCK")}
                  >
                    Czarna lista
                  </button>
                  <Link href={"/uzytkownik/" + author.username}>Profil</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default PostAuthorInfor;
