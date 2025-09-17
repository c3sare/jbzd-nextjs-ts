"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type ButtonSwitchTabProps = {
  children?: React.ReactNode;
  href: string;
};

const ButtonSwitchTab: React.FC<ButtonSwitchTabProps> = ({
  children,
  href,
}) => {
  const pathname = usePathname();
  const params = useParams();

  const isActiveTab =
    pathname === href || (pathname.startsWith(href) && params.index);

  return (
    <Link
      className={clsx(
        "w-[50%] flex justify-center items-center h-[40px] flex-1 text-white rounded-[3px] text-center bg-[#1f1f1f]",
        isActiveTab ? "bg-[#c03e3e]" : "bg-[#1f1f1f]"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ButtonSwitchTab;
