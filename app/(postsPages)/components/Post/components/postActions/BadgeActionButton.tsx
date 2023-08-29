import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";

import { IoMdArrowDropup } from "react-icons/io";

import AddBadgeButton from "./AddBadgeButton";
import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BadgeActionButtonProps = {
  isOwnPost: boolean;
  isLoggedIn: boolean;
  postId: string;
  setBadgeCount: (type: "rock" | "silver" | "gold", count: number) => void;
};

type BadgeType = "ROCK" | "SILVER" | "GOLD";

const BadgeActionButton: React.FC<BadgeActionButtonProps> = ({
  isOwnPost,
  isLoggedIn,
  postId,
  setBadgeCount,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  if (isOwnPost) return null;

  const handleAddBadge = (type: BadgeType) => {
    if (!isLoggedIn) return toast.error("Dostęp tylko dla zalogowanych!");
    setIsLoading(true);
    axios
      .post(`/api/post/badge/${postId}/${type.toLowerCase()}`)
      .then((res) => {
        const { result, count, type } = res.data;
        if (result === "NOT_ENOUGHT_COINS") {
          toast.error("Nie wystarczająca ilość monet!");
        } else if (result === "ALREADY_EXIST") {
          toast.error("Już przyznałeś taką odznakę!");
        } else {
          setBadgeCount(type, count);
          toast.success("Przyznano odznakę!");
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy dodawaniu odznaki!");
      })
      .finally(() => {
        if (isVisible) toggleVisible();
        setIsLoading(false);
      });
  };

  return (
    <div className="w-[51px] min-w-[51px]" ref={containerRef}>
      <div
        className="w-full h-[51px] bg-[#313131] rounded-[3px] flex justify-center items-center relative cursor-pointer"
        onClick={toggleVisible}
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
