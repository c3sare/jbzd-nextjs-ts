"use client";

import clsx from "clsx";

type SwitchButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({
  children,
  onClick,
  active,
}) => {
  const activeClassName = "bg-[#313131]";
  const className = "bg-[#2b2b2b] translate-y-[3px]";

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative py-2 flex w-1/4 items-center justify-center transition-transform duration-500",
        active ? activeClassName : className
      )}
    >
      {children}
    </button>
  );
};

export default SwitchButton;
