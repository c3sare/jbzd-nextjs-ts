import clsx from "clsx";
import React from "react";
import { DOMAttributes, HTMLAttributes } from "react";

type ToolbarBtnProps = {
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  title?: string;
  active?: boolean;
};

const ToolbarBtn: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ToolbarBtnProps
> = ({ disabled, onClick, children, className, title, active }, ref) => (
  <button
    disabled={disabled}
    onClick={onClick}
    ref={ref}
    className={clsx(
      "w-[24px] h-[24px] flex justify-center items-center border border-transparent hover:border-[#999] rounded-[3px] mr-[2px] text-[15px] text-white",
      className,
      active && "border-[#999] bg-[rgba(0,_0,_0,_.1)]",
      active ? "hover:bg-[hsla(0,_0%,_100%,_.25)]" : "hover:bg-[#181818]"
    )}
    title={title}
    type="button"
  >
    {children}
  </button>
);

export default React.forwardRef(ToolbarBtn);
