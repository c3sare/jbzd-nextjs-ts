import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { IoMdArrowDropup } from "react-icons/io";

import AddBadgeButton from "./AddBadgeButton";

const BadgeActionButton = () => {
  const [isExpanded, setIsExpaned] = useState<boolean>(false);

  return (
    <div className="w-[51px]">
      <div
        className="w-full h-[51px] bg-[#313131] rounded-[3px] flex justify-center items-center relative cursor-pointer"
        onClick={() => setIsExpaned(!isExpanded)}
      >
        <IoMdArrowDropup
          className={clsx(
            "text-[20px] text-white absolute top-[-4px]",
            isExpanded && "rotate-180"
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
      {isExpanded && (
        <div className="min-w-[51px] flex flex-col bottom-full left-0 absolute bg-[#313131] py-[5px] gap-[10px] z-10 shadow-[5px_-5px_5px_#252525]">
          <AddBadgeButton name="gold" title="Złota dzida" />
          <AddBadgeButton name="silver" title="Srebrna dzida" />
          <AddBadgeButton name="rock" title="Kamienna dzida" />
        </div>
      )}
    </div>
  );
};

export default BadgeActionButton;
