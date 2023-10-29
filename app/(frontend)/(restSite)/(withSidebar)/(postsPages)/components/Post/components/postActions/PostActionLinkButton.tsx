import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import clsx from "clsx";
import Link from "next/link";
import React, { useMemo } from "react";

type PostActionLinkButtonProps = {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
};

const PostActionLinkButton: React.FC<PostActionLinkButtonProps> = ({
  href,
  onClick,
  children,
  active,
  disabled,
  isLoading,
}) => {
  const className = useMemo(
    () =>
      clsx(
        "bg-[#181818] rounded-[2px] flex w-[51px] min-w-[51px] h-[45px] mb-[3px] items-center justify-center text-[28px]",
        active ? "text-[#f0cc00]" : "text-[#777]",
        isLoading && "opacity-60"
      ),
    [active, isLoading]
  );

  if (href)
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  else
    return (
      <button disabled={disabled} className={className} onClick={onClick}>
        {isLoading ? (
          <BiLoaderAlt className="text-[#777] animate-spin text-[26px] mx-auto" />
        ) : (
          children
        )}
      </button>
    );
};

export default PostActionLinkButton;
