"use client";

import { useMemo, type DOMAttributes } from "react";

import clsx from "clsx";

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
  const colors = useMemo(
    () => ({
      primary: "bg-[#3c3c3c]",
      secondary: "bg-[#c03e3f]",
    }),
    []
  );

  const className = useMemo(
    () =>
      clsx(
        "cursor-pointer text-white font-bold h-[34px] px-[15px] rounded-[4px] flex justify-center items-center gap-[0_10px] relative flex-[1] sm:flex-none text-[10px] sm:text-[12px]",
        colors[variant],
        active &&
          "after:content-normal after:absolute after:top-[calc(100%_-_2px)] after:left-0 after:w-full after:h-[7px] after:bg-[#3c3c3c]"
      ),
    [variant, active, colors]
  );

  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {startIcon && <span className="text-[17px]">{startIcon}</span>}
      {children}
      {endIcon && <span className="text-[17px]">{endIcon}</span>}
    </button>
  );
};

export default IconButton;
