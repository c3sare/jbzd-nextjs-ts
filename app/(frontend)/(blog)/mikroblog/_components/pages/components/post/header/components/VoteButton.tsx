import { BiMinus } from "@react-icons/all-files/bi/BiMinus";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type VoteButtonProps = {
  type: "PLUS" | "MINUS";
  vote: "PLUS" | "MINUS" | "";
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

const VoteButton: React.FC<VoteButtonProps> = ({
  type,
  vote,
  onClick,
  disabled,
}) => {
  const icons = {
    PLUS: {
      icon: BiPlus,
      className: "bg-[#94b424] hover:bg-[#718a1c]",
    },
    MINUS: {
      icon: BiMinus,
      className: "bg-[#c23d3a] hover:bg-[#9b312e]",
    },
  };

  const Icon = icons[type].icon;

  const isActive = type === vote;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "w-[24px] h-[24px] p-0 leading-[24px] ml-[2px] inline-block text-center text-[11px] font-semibold transition-all duration-200 ease-in-out disabled:opacity-60",
        isActive ? icons[type].className : "bg-[#6e7578] hover:bg-[#565b5d]"
      )}
    >
      <Icon size={24} />
    </button>
  );
};

export default VoteButton;
