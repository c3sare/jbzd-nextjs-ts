"use client";

import clsx from "clsx";

type IconButtonProps = {
  children: React.ReactNode;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center text-[16px]",
        className
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
