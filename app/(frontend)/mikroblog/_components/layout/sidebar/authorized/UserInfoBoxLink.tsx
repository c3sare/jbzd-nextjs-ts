"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserInfoBoxLinkProps = {
  children?: React.ReactNode;
  href: string;
};

const UserInfoBoxLink: React.FC<UserInfoBoxLinkProps> = ({
  children,
  href,
}) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={clsx(
        "mr-[20px] text-[12px] whitespace-nowrap",
        isActive ? "text-[#e01d1d]" : "text-[#b3d734]"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default UserInfoBoxLink;
