"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

const LinkButton: React.FC<LinkButtonProps> = ({ href, children }) => {
  const pathname = usePathname();

  const activeClassName = "bg-[#313131]";
  const className = "bg-[#2b2b2b] translate-y-[3px]";

  const isActive = pathname === href;

  return (
    <Link
      prefetch={false}
      className={clsx(
        "relative py-2 flex w-1/4 items-center justify-center text-[11px] sm:text-[13px] transition-transform duration-500 hover:bg-[#313131]",
        isActive ? activeClassName : className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
