"use client";

import clsx from "clsx";
import { DOMAttributes } from "react";

type ActionButtonProps = {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  children?: React.ReactNode;
  active?: boolean;
  activeIcon?: React.ReactNode;
  disabled?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  active,
  activeIcon,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "inline-block bg-[#313131] p-[5px_10px] rounded-[5px] text-[18px] mx-1",
        active && "text-[#505050]",
        disabled && "opacity-80 text-[#505050]"
      )}
      onClick={onClick}
    >
      {active && activeIcon ? activeIcon : children}
    </button>
  );
};

export default ActionButton;
