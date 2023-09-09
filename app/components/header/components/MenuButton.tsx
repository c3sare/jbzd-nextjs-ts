"use client";

import clsx from "clsx";
import Link from "next/link";

type MenuButtonProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  href,
  onClick,
  icon,
  className,
  active,
}) => {
  const classNames = clsx(
    `
    hidden
    pr-[20px]
    pl-[8px]
    text-[15px]
    items-center
    justify-center
    h-full
    border-b
  `,
    active ? "border-b-red-600" : "border-b-transparent hover:border-b-white",
    className
  );

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  return href ? (
    <Link href={href} className={classNames} prefetch={false}>
      {content}
    </Link>
  ) : (
    <button className={classNames} onClick={onClick}>
      {content}
    </button>
  );
};

export default MenuButton;
