import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";

import { IoMdArrowDropup } from "@react-icons/all-files/io/IoMdArrowDropup";

import AddBadgeButton from "./AddBadgeButton";
import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import setPostBadge from "../../actions/setPostBadge";

type BadgeType = "ROCK" | "SILVER" | "GOLD";

type BadgeActionButtonProps = {
  isOwnPost: boolean;
  isLoggedIn: boolean;
  postId: string;
  setBadgeCount: (type: BadgeType, count: number) => void;
};

const BadgeActionButton: React.FC<BadgeActionButtonProps> = ({
  isOwnPost,
  isLoggedIn,
  postId,
  setBadgeCount,
}) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  if (isOwnPost) return null;

  const handleAddBadge = async (type: BadgeType) => {
    if (!isLoggedIn) return toast.error("Dostęp tylko dla zalogowanych!");
    setIsLoading(true);
    toggleVisible();
    // /api/post/badge/${postId}/${type.toLowerCase()}

    const res = await setPostBadge(postId, type);
    if (res.result) {
      const { result, count, type, coins } = res;
      if (result === "NOT_ENOUGHT_COINS") {
        toast.error("Nie wystarczająca ilość monet!");
      } else if (result === "ALREADY_EXIST") {
        toast.error("Już przyznałeś taką odznakę!");
      } else if (result === "OK") {
        setBadgeCount(type as BadgeType, count as number);
        toast.success("Przyznano odznakę!");
        session.update({ coins });
      }
    } else {
      if (res.message) toast.error(res.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-[51px] min-w-[51px]" ref={containerRef}>
      <div
        className="w-full h-[51px] bg-[#313131] rounded-[3px] flex justify-center items-center relative cursor-pointer"
        onClick={() => {
          if (!isLoading) toggleVisible();
        }}
      >
        <IoMdArrowDropup
          className={clsx(
            "text-[20px] text-white absolute top-[-4px]",
            isVisible && "rotate-180"
          )}
        />
        <Image
          className="h-auto max-w-full relative top-[6px]"
          alt="Odznaki"
          src="/images/likes/coins.png"
          width={25}
          height={25}
        />
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#333]">
            <BiLoaderAlt className="animate-spin text-[26px] mx-auto" />
          </div>
        )}
      </div>
      {isVisible && (
        <div className="min-w-[51px] flex flex-col bottom-full left-0 absolute bg-[#313131] py-[5px] gap-[10px] z-10 shadow-[5px_-5px_5px_#252525]">
          <AddBadgeButton
            disabled={isLoading}
            name="gold"
            title="Złota dzida"
            onClick={() => handleAddBadge("GOLD")}
          />
          <AddBadgeButton
            disabled={isLoading}
            name="silver"
            title="Srebrna dzida"
            onClick={() => handleAddBadge("SILVER")}
          />
          <AddBadgeButton
            disabled={isLoading}
            name="rock"
            title="Kamienna dzida"
            onClick={() => handleAddBadge("ROCK")}
          />
        </div>
      )}
    </div>
  );
};

export default BadgeActionButton;
