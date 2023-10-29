"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

type BlogNavbarFilterItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
> & {
  rangeInHours: number;
};

const BlogNavbarFilterItem: React.FC<BlogNavbarFilterItemProps> = ({
  rangeInHours,
  ...rest
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const time = searchParams.get("time") || "24h";

  const name = `${rangeInHours}h`;

  const isActive = time === name;

  const handleClickFilter = () => {
    if (rangeInHours === 24) return router.push(pathname);
    router.push(`?time=${name}`);
  };

  const isPage = ["/mikroblog/gorace", "/mikroblog/aktywne"].includes(pathname);

  return (
    isPage && (
      <li
        className={clsx(
          "float-right px-[5px] pt-[6px] text-[13px] font-bold relative block"
        )}
      >
        <button
          onClick={handleClickFilter}
          className={clsx(
            "block text-[11px] text-[#5e6567] font-bold p-[5px_10px] overflow-hidden relative",
            "after:w-full after:h-[2px] after:bg-[#c23d3a] after:absolute after:bottom-0 after:right-full after:transition-transform after:ease-in-out after:duration-200",
            isActive
              ? "text-white bg-[#c23d3a]"
              : "hover:after:translate-x-full"
          )}
          {...rest}
        >
          {name}
        </button>
      </li>
    )
  );
};

export default BlogNavbarFilterItem;
