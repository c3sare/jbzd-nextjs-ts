"use client";

import { AiOutlineLoading } from "react-icons/ai";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  isLoading,
}) => {
  return (
    <div className="flex justify-end my-2">
      <button
        disabled={disabled}
        onClick={onClick}
        type={type || "button"}
        className="w-full px-2 max-w-none bg-[#c03e3e] rounded-[5px] font-normal text-[13px] outline-none h-[30px] disabled:opacity-80"
      >
        <span className="relative">
          {children}
          {isLoading && (
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
