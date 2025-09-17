import clsx from "clsx";
import React from "react";
import { DOMAttributes } from "react";

type ToolbarBtnProps = {
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  children?: React.ReactNode;
  title?: string;
  active?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const ToolbarBtn = ({
  disabled,
  onClick,
  children,
  title,
  active,
  ref,
}: ToolbarBtnProps) => {
  const activeClassName =
    "hover:bg-[hsla(0,_0%,_100%,_.25)] border-[#999] bg-[rgba(0,_0,_0,_.1)]";
  const noActiveClassName = "hover:bg-[#181818] border-transparent";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      className={clsx(
        "w-[24px] h-[24px] flex justify-center items-center border hover:border-[#999] rounded-[3px] mr-[2px] text-[15px] text-white",
        active ? activeClassName : noActiveClassName
      )}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};

export default ToolbarBtn;
