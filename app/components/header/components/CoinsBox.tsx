"use client";

import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import Image from "next/image";
import Link from "next/link";

const CoinsBox = () => {
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  return (
    <div
      className="h-full flex items-center justify-center relative"
      ref={containerRef}
    >
      <div
        className="inline-block ml-[15px] text-left px-[10px] py-[5px] rounded-xl bg-[#4f4f4f] select-none cursor-pointer"
        onClick={toggleVisible}
      >
        <div className="flex justify-center items-center gap-[10px]">
          <Image alt="Moneta" width={21} height={21} src="/images/coin.png" />
          <span className="font-bold">0</span>
        </div>
      </div>
      {isVisible && (
        <div className="absolute top-[100%] right-0 w-[300px] z-10 border border-black bg-[#181818] px-[15px] py-[7px] text-left">
          <Link
            href="/premium/monetki/tutorial"
            className="px-[10px] py-[5px] text-[16px]"
          >
            Tutorial
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoinsBox;
