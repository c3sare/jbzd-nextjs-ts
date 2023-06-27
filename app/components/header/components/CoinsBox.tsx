"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const CoinsBox = () => {
  const coinRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback(
    () => setIsOpen((prevState) => !prevState),
    []
  );

  useEffect(() => {
    const hideContainer = (e: any) => {
      if (!coinRef.current?.contains(e.target)) setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("click", hideContainer, true);
    } else {
      document.removeEventListener("click", hideContainer, true);
    }
    return () => document.removeEventListener("click", hideContainer, true);
  }, [isOpen]);

  return (
    <div
      className="inline-block ml-[15px] text-left relative px-[10px] py-[5px] rounded-xl bg-[#4f4f4f]"
      ref={coinRef}
    >
      <div
        className="flex justify-center items-center gap-[10px] cursor-pointer"
        onClick={handleClick}
      >
        <Image alt="Moneta" width={21} height={21} src="/images/coin.png" />
        <span className="font-bold">0</span>
      </div>
      {isOpen && (
        <div className="absolute top-[100%] right-0 w-[300px] z-10 border border-black bg-[#181818] px-[15px] py-[7px]">
          <Link
            href="/premium/monetki/tutorial"
            className="px-[10px] py-[5px] text-[16px]"
            onClick={handleClick}
          >
            Tutorial
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoinsBox;
