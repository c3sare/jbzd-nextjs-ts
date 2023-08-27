import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { MouseEventHandler } from "react";

type AuthorInfoButtonProps = {
  children?: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  active?: boolean;
  activeClassName?: string;
};

const AuthorInfoButton: React.FC<AuthorInfoButtonProps> = ({
  children,
  href,
  onClick,
  disabled,
  active,
  activeClassName,
}) => {
  const className = clsx(
    "p-[3px_7px] rounded-[4px] text-[#8f8f8f]",
    disabled ? "disabled:cursor-normal" : "cursor-pointer hover:text-white",
    active && "text-white",
    active && activeClassName
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  } else {
    return (
      <button disabled={disabled} className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default AuthorInfoButton;
