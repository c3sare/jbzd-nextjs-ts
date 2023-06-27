"use client";

import Link from "next/link";

type MenuButtonProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  href,
  onClick,
  icon,
}) => {
  const className =
    "pr-[20px] pl-[8px] text-[15px] flex items-center justify-center h-full border-b border-b-transparent hover:border-b-white";

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
};

export default MenuButton;
