import { HTMLAttributes } from "react";

type SwitchTabButtonProps = {
  children?: React.ReactNode;
  onClick?: HTMLAttributes<HTMLButtonElement>["onClick"];
  isActive?: boolean;
};

const SwitchTabButton: React.FC<SwitchTabButtonProps> = ({
  children,
  onClick,
  isActive,
}) => {
  return (
    <button className="text-[12px] text-[#b3d734]" onClick={onClick}>
      {isActive ? "Powrót" : children}
    </button>
  );
};

export default SwitchTabButton;
