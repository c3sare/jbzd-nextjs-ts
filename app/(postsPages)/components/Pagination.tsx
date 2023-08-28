"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GiDiceSixFacesTwo } from "react-icons/gi";
import ScrollBarPageButton from "./pagination/ScrollBarPageButton";
import useAllSearchParams from "@/app/hooks/useAllSearchParams";
import ScrollBar from "./pagination/ScrollBar";
import { usePathname } from "next/navigation";

const Pagination = ({
  pageName = "str",
  currentPage,
  allPages,
}: {
  pageName?: string;
  currentPage: number;
  allPages: number;
}) => {
  const query = useAllSearchParams();
  const [scrollBarProgress, setScrollBarProgress] = useState<number>(0);

  return (
    <>
      <div className="md:hidden w-full flex gap-[2px]">
        <Link
          href={{
            pathname:
              currentPage === 2
                ? `/${pageName}`
                : `/${pageName}/${currentPage - 1}`,
            query,
          }}
          className={clsx(
            "w-[60px] text-[30px] flex items-center justify-center h-[50px] text-white rounded-[2px] bg-[#c03e3e]",
            currentPage === 1 &&
              "opacity-30 grayscale pointer-events-none cursor-default"
          )}
        >
          <AiOutlineArrowLeft />
        </Link>
        <Link
          href="/losowe"
          className="w-[60px] text-[30px] flex items-center justify-center h-[50px] text-white rounded-[2px] bg-[#c03e3e]"
        >
          <GiDiceSixFacesTwo />
        </Link>
        <Link
          href={{ pathname: `/${pageName}/${currentPage + 1}`, query }}
          className={clsx(
            "flex flex-grow text-[30px] items-center justify-center h-[50px] text-white rounded-[2px] bg-[#c03e3e]",
            currentPage + 1 > allPages &&
              "opacity-30 grayscale pointer-events-none cursor-default"
          )}
        >
          <AiOutlineArrowRight />
        </Link>
      </div>
      {currentPage < allPages && (
        <div className="hidden md:flex justify-between ml-[56px] pr-[5px]">
          <Link
            href={{ pathname: `/${pageName}/${currentPage + 1}`, query }}
            className="block w-full max-w-[600px] mb-[10px] leading-[50px] text-[18px] text-center text-white bg-gradient-lightred-blackred"
          >
            następna strona
          </Link>
          <Link
            href="/losowe"
            className="relative flex items-center justify-center w-[20%] h-[50px] ml-[10px] text-[32px] text-white bg-gradient-lightred-blackred"
          >
            <GiDiceSixFacesTwo />
          </Link>
        </div>
      )}
      <div className="hidden md:block ml-[56px] pr-[5px]">
        <div className="m-[0_auto] p-0 text-[1em] overflow-hidden select-none">
          <table className="w-full">
            <tbody>
              <tr>
                {[...Array(allPages > 7 ? 7 : allPages)].map(
                  (_i, index: number) => {
                    const ceil = Math.ceil(allPages * scrollBarProgress);

                    const page =
                      allPages > 7
                        ? 1 +
                          index +
                          (ceil > allPages - 7 ? allPages - 7 : ceil)
                        : index + 1;

                    return (
                      <ScrollBarPageButton
                        key={index}
                        active={page === currentPage}
                        pageName={pageName}
                        page={page}
                      />
                    );
                  }
                )}
              </tr>
              {allPages > 7 && (
                <tr>
                  <td colSpan={7}>
                    <ScrollBar
                      {...{ allPages, setScrollBarProgress, currentPage }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Pagination;
