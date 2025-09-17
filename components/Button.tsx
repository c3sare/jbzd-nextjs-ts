"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import useZodFormContext from "@/hooks/useZodFormContext";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  bgColorClassName?: string;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  buttonClassName?: HTMLAttributes<HTMLButtonElement>["className"];
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  bgColorClassName,
  className,
  buttonClassName,
  disabled,
  isLoading: isLoadingComponent,
}) => {
  const hookForm = useZodFormContext();

  return (
    <div className={clsx(className ? className : "flex justify-end my-2")}>
      <button
        disabled={hookForm?.formState.isLoading || disabled}
        onClick={onClick}
        type={type || "button"}
        className={clsx(
          "w-full px-2 max-w-none rounded-[5px] font-normal text-[13px] outline-none h-[30px] disabled:opacity-80 disabled:bg-[#2d2d2d]",
          bgColorClassName ? bgColorClassName : "bg-[#c03e3e]",
          buttonClassName
        )}
      >
        <span className="relative">
          {children}
          {(hookForm?.formState.isLoading || isLoadingComponent) && (
            <div className="absolute left-[calc(100%_+_8px)] top-[50%] translate-y-[-50%]">
              <AiOutlineLoading className="animate-spin" />
            </div>
          )}
        </span>
      </button>
    </div>
  );
};

export default Button;
