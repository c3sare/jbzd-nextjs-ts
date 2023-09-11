import clsx from "clsx";
import { DOMAttributes, HTMLAttributes } from "react";

type CommentButtonProps = {
  children?: React.ReactNode;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  icon?: React.ReactNode;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
};

const CommentButton: React.FC<CommentButtonProps> = ({
  children,
  onClick,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-[12px] text-[#777] mr-[10px] flex items-center justify-between",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default CommentButton;
