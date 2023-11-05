import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type TagButtonProps = {
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  children?: React.ReactNode;
  variant?: "red" | "black";
  isActive?: boolean;
};

const TagButton: React.FC<TagButtonProps> = ({
  onClick,
  children,
  variant = "black",
  isActive,
}) => {
  const bgColor = {
    black: "bg-black",
    red: "bg-[#c23d3a]",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        bgColor[variant],
        "w-[calc(50%_-_10px)] mx-[5px] block text-[14px] rounded-[3px] text-white py-[10px]"
      )}
    >
      {children}
    </button>
  );
};

export default TagButton;
