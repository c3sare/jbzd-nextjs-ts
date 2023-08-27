import { TfiCup } from "react-icons/tfi";
import type { PostType } from "../../types/PostType";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import AuthorInfoButton from "./authorInfo/AuthorInfoButton";
import axios from "axios";

type PostAuthorInfoProps = {
  author: Required<PostType>["author"];
};

const PostAuthorInfor: React.FC<PostAuthorInfoProps> = ({ author }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [spearCount, setSpearCount] = useState<number>(author.spears);
  const [userAction, setUserAction] = useState<"FOLLOW" | "BLOCK" | "">(
    author.action || ""
  );
  const session = useSession();

  const username = session.data?.user?.username;

  const handleUserAction = (method: "BLOCK" | "FOLLOW") => {
    setIsLoading(true);
    axios
      .post("/api/user/action", {
        method,
        id: author.id,
      })
      .then((res) => {
        setUserAction(res.data.method);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(true));
  };

  const isOwnPost = username === author.username;

  const handleToggleSpear = () => {
    setIsLoading(true);
    axios
      .post("/api/user/vote/" + author.id)
      .then((data) => {
        setSpearCount(data.data.count);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <span className="text-[#777]"> przez </span>
      <span className="relative text-white group">
        {author.username}
        <div className="absolute z-[9999999] hidden top-full left-[calc(50%_-_10px)] translate-x--1/2 group-hover:block">
          <div className="mt-[8px] w-[310px] rounded-[3px] bg-[#313131] flex before:w-0 before:h-0 before:content-normal before:block before:border-r-[5px] before:border-l-[5px] before:border-b-[5px] before:border-solid before:border-[transparent_transparent_#313131] before:absolute before:left-[10px] before:top-[3px] p-[15px]">
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
                  <div
                    className={clsx(
                      "flex-grow bg-[#252525] leading-[38px] text-[20px] font-bold text-white items-center p-[0_8px] rounded-[4px] relative flex justify-between",
                      !isOwnPost && "pr-[30px]"
                    )}
                  >
                    <span>
                      <Image
                        src="/images/spear.png"
                        width={22}
                        height={22}
                        alt="Dzida"
                      />
                    </span>
                    <span>{spearCount}</span>
                    {!isOwnPost && (
                      <button
                        disabled={isLoading}
                        className="w-[25px] h-[25px] rounded-full absolute right-[-5px] text-white bg-[#c03e3e] font-bold text-[30px] flex items-center justify-center ml-2"
                        onClick={handleToggleSpear}
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="flex-grow bg-[#252525] leading-[38px] text-[20px] font-bold text-white items-center p-[0_8px] rounded-[4px] relative flex justify-between">
                    <span className="text-[22px]">
                      <TfiCup />
                    </span>
                    <span>{author.rank}</span>
                  </div>
                </div>
                <div className="w-full flex flex-nowrap justify-between text-[12px]">
                  <AuthorInfoButton
                    disabled={author.username === username || isLoading}
                    active={userAction === "FOLLOW"}
                    activeClassName="bg-red-600"
                    onClick={() => handleUserAction("FOLLOW")}
                  >
                    Obserwuj
                  </AuthorInfoButton>
                  <AuthorInfoButton
                    disabled={author.username === username || isLoading}
                    active={userAction === "BLOCK"}
                    activeClassName="bg-black"
                    onClick={() => handleUserAction("BLOCK")}
                  >
                    Czarna lista
                  </AuthorInfoButton>
                  <AuthorInfoButton href={"/uzytkownik/" + author.username}>
                    Profil
                  </AuthorInfoButton>
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
