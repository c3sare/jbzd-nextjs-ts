"use client";

import clsx from "clsx";
import Link from "next/link";
import { memo, useState } from "react";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import ScrollBarPageButton from "./pagination/ScrollBarPageButton";
import ScrollBar from "./pagination/ScrollBar";
import RandomPostButton from "./pagination/RandomPostButton";
import { useSearchParams } from "next/navigation";

const Pagination = ({
  pageName = "str",
  currentPage,
  allPages,
}: {
  pageName?: string;
  currentPage: number;
  allPages: number;
}) => {
  const params = useSearchParams();
  const [scrollBarProgress, setScrollBarProgress] = useState<number>(0);

  const paramsString = params.toString().replaceAll("+", "%20");
  const query = paramsString ? "?" + paramsString : "";

  return (
    <>
      <div className="md:hidden w-full flex gap-[2px]">
        <Link
          href={
            currentPage === 2
              ? `/${pageName}${query}`
              : `/${pageName}/${currentPage - 1}${query}`
          }
          className={clsx(
            "w-[60px] text-[30px] flex items-center justify-center h-[50px] text-white rounded-[2px] bg-[#c03e3e]",
            currentPage === 1 &&
              "opacity-30 grayscale pointer-events-none cursor-default"
          )}
        >
          <AiOutlineArrowLeft />
        </Link>
        <RandomPostButton className="w-[60px] text-[30px] flex items-center justify-center h-[50px] text-white rounded-[2px] bg-[#c03e3e]" />
        <Link
          href={`/${pageName}/${currentPage + 1}${query}`}
          className={clsx(
            "flex grow text-[30px] items-center justify-center h-[50px] text-white rounded-[2px] bg-[#c03e3e]",
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
            href={`/${pageName}/${currentPage + 1}${query}`}
            className="block w-full max-w-[600px] mb-[10px] leading-[50px] text-[18px] text-center text-white bg-gradient-lightred-blackred"
          >
            następna strona
          </Link>
          <RandomPostButton className="relative flex items-center justify-center w-[20%] h-[50px] ml-[10px] text-[32px] text-white bg-gradient-lightred-blackred" />
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

export default memo(Pagination);
