"use client";

import { HTMLAttributes } from "react";
import { IconType } from "@react-icons/all-files";
import clsx from "clsx";

type StyledButtonProps = {
  onClick?: HTMLAttributes<HTMLButtonElement>["onClick"];
  children?: React.ReactNode;
  startIcon?: IconType;
  active?: boolean;
};

const StyledButton: React.FC<StyledButtonProps> = ({
  onClick,
  children,
  startIcon: Icon,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer text-white font-bold h-[34px] px-[15px] rounded-[4px] flex justify-center items-center gap-[0_10px] relative flex-[1] sm:flex-none text-[10px] sm:text-[12px]",
        active ? "bg-[#c03e3f]" : "bg-[#3c3c3c]"
      )}
    >
      {Icon && <Icon className="mr-[2px]" />}
      <span>{children}</span>
    </button>
  );
};

export default StyledButton;
