"use client";

import clsx from "clsx";
import { DOMAttributes } from "react";

type IconButtonProps = {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  variant?: "primary" | "secondary";
  active?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  startIcon,
  endIcon,
  disabled,
  onClick,
  variant = "primary",
  active,
}) => {
  const colors = {
    primary: "bg-[#3c3c3c]",
    secondary: "bg-[#c03e3f]",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "cursor-pointer text-white font-bold h-[34px] px-[15px] rounded-[4px] flex justify-center items-center gap-[0_10px] relative flex-[1] sm:flex-none text-[10px] sm:text-[12px]",
        colors[variant],
        active &&
          "after:content-normal after:absolute after:top-[100%] after:left-0 after:w-full after:h-[5px] after:bg-transparent sm:after:bg-[#3c3c3c]"
      )}
    >
      {startIcon && <span className="text-[17px]">{startIcon}</span>}
      {children}
      {endIcon && <span className="text-[17px]">{endIcon}</span>}
    </button>
  );
};

export default IconButton;
