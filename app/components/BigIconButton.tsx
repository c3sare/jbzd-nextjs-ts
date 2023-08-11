import { HTMLAttributes } from "react";

type BigIconButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: HTMLAttributes<HTMLButtonElement>["onClick"];
};

const BigIconButton: React.FC<BigIconButtonProps> = ({
  children,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="h-[70px] text-[13px] flex-grow-[1] basis-0 min-w-0 flex rounded-[3px] bg-[#505050] hover:bg-[#777] justify-center items-center flex-col gap-[5px] text-white cursor-pointer"
    >
      <span className="text-[24px]">{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default BigIconButton;
