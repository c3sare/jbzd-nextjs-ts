import { DOMAttributes } from "react";

type ActionButtonProps = {
  children?: React.ReactNode;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#505050] text-[#f5f5f5] rounded-[5px] leading-[30px] px-[10px] font-normal text-[12px] mx-[5px] outline-none"
    >
      {children}
    </button>
  );
};

export default ActionButton;
