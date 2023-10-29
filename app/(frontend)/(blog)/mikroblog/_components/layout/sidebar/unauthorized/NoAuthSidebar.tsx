"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const NoAuthSidebar = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const tab = [
    <Link
      href="/logowanie"
      className="text-[14px] bg-black rounded-[3px] text-white text-center p-[10px] block"
      key={0}
    >
      Zaloguj się
    </Link>,
    <Link
      href="/logowanie"
      className="text-[14px] bg-black rounded-[3px] text-white text-center p-[10px] block"
      key={1}
    >
      Zarejestruj się
    </Link>,
  ];

  return (
    <div className="mb-[24px]">
      <ul className="mb-[8px] border-b border-b-[#4a4a4a] flex">
        <li className="pr-[15px] text-[13px] font-bold">
          <button
            className={clsx(
              "text-[#6e7578] py-[10px] overflow-hidden relative",
              "after:absolute after:-left-full after:bottom-0 after:w-full after:h-[2px] after:transition-transform after:duration-200 after:ease-in-out after:bg-[#e01d1d] hover:after:translate-x-full",
              currentTab === 0 && "after:translate-x-full text-white"
            )}
            onClick={() => setCurrentTab(0)}
          >
            Zaloguj się
          </button>
        </li>
        <li className="px-[15px] text-[13px] font-bold">
          <button
            className={clsx(
              "text-[#6e7578] py-[10px] overflow-hidden relative",
              "after:absolute after:-left-full after:bottom-0 after:w-full after:h-[2px] after:transition-transform after:duration-200 after:ease-in-out after:bg-[#e01d1d] hover:after:translate-x-full",
              currentTab === 1 && "after:translate-x-full text-white"
            )}
            onClick={() => setCurrentTab(1)}
          >
            Załóż konto
          </button>
        </li>
      </ul>
      <div className="clear-both">{tab[currentTab]}</div>
    </div>
  );
};

export default NoAuthSidebar;
