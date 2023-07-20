"use client";

import clsx from "clsx";
import { CSSProperties } from "react";

type SwitchButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
  style?: CSSProperties;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({
  children,
  onClick,
  active,
  style,
}) => {
  const activeClassName = "bg-[#313131]";
  const className = "bg-[#2b2b2b] translate-y-[3px]";

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative py-2 flex w-1/4 items-center justify-center text-[11px] sm:text-[13px] transition-transform duration-500 hover:bg-[#313131]",
        active ? activeClassName : className
      )}
      style={style}
    >
      {children}
    </button>
  );
};

export default SwitchButton;
