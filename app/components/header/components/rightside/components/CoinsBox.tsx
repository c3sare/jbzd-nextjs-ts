"use client";

import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const CoinsBox = () => {
  const session = useSession();
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  const coins = session.data?.user?.coins || 0;

  return (
    <div
      className="flex items-center justify-center h-full lg:relative"
      ref={containerRef}
    >
      <div
        className="inline-block ml-[15px] text-left px-[10px] py-[5px] rounded-xl bg-[#4f4f4f] select-none cursor-pointer"
        onClick={toggleVisible}
      >
        <div className="flex justify-center items-center gap-[10px]">
          <Image alt="Moneta" width={21} height={21} src="/images/coin.png" />
          <span className="font-bold">{coins}</span>
        </div>
      </div>
      {isVisible && (
        <div className="absolute top-[46px] lg:top-[100%] right-0 w-full lg:w-[300px] z-10 border border-black bg-[#181818] px-[15px] py-[7px] text-left">
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
