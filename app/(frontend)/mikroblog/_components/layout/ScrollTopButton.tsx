"use client";

import { IoMdArrowRoundUp } from "@react-icons/all-files/io/IoMdArrowRoundUp";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const ScrollTopButton = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  const [isVisibleScrollButton, setIsVisibleScrollButton] =
    useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setIsFadeOut(false);
        setIsVisibleScrollButton(true);
      } else {
        setIsFadeOut(true);
        timeoutRef.current = setTimeout(() => {
          setIsVisibleScrollButton(window.scrollY > window.innerHeight);
          setIsFadeOut(false);
        }, 600);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisibleScrollButton]);

  const handleScrollTop = () => {
    const stepHeight = 30;
    const scrollHeight = window.scrollY;
    let steps = Math.floor(scrollHeight / stepHeight);
    const interval = setInterval(() => {
      window.scrollBy(0, -stepHeight);
      steps--;

      if (steps <= 0) clearInterval(interval);
    }, 1);
  };

  return (
    isVisibleScrollButton && (
      <button
        onClick={handleScrollTop}
        className={clsx(
          "fixed bottom-[25px] right-[25px] bg-[#6e7578] text-white w-[45px] h-[45px] rounded-full leading-[45px] shadow-md flex items-center justify-center animate-fadein",
          isFadeOut && "animate-fadeout"
        )}
      >
        <IoMdArrowRoundUp size={30} />
      </button>
    )
  );
};

export default ScrollTopButton;
