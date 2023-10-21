"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BlogNavbarItemProps = {
  children?: React.ReactNode;
  href: string;
};

const BlogNavbarItem: React.FC<BlogNavbarItemProps> = ({ children, href }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li className={clsx("px-[15px] text-[13px] relative")}>
      <Link
        className={clsx(
          "overflow-hidden block relative py-[10px] font-bold transition-colors",
          "after:absolute after:bottom-0 after:right-full after:w-full after:h-[2px] after:bg-[#e01d1d] after:transition-transform after:duration-300 after:ease-in-out",
          isActive ? "after:translate-x-full" : "hover:after:translate-x-full",
          isActive ? "text-white" : "text-[#6e7578]"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};

export default BlogNavbarItem;
