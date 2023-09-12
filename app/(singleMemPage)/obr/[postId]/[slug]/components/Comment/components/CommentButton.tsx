import { IconType } from "@react-icons/all-files";
import clsx from "clsx";
import { DOMAttributes, HTMLAttributes } from "react";

type CommentButtonProps = {
  children?: React.ReactNode;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  icon?: IconType;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  disabled?: boolean;
  active?: boolean;
};

const CommentButton: React.FC<CommentButtonProps> = ({
  children,
  onClick,
  icon: Icon,
  className,
  disabled,
  active,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "text-[12px] text-[#777] mr-[10px] flex items-center justify-between hover:text-[#bd3c3c] disabled:opacity-60",
        className,
        active && "text-[#bd3c3c]"
      )}
    >
      {Icon && <Icon size={16} className="mr-[5px]" />}
      <span>{children}</span>
    </button>
  );
};

export default CommentButton;
