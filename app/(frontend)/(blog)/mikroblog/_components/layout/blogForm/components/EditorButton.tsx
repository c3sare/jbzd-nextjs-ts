import type { IconType } from "@react-icons/all-files";
import type { ButtonHTMLAttributes } from "react";

type EditorButtonProps = {
  icon: IconType;
  title: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const EditorButton: React.FC<EditorButtonProps> = ({
  icon: Icon,
  title,
  onClick,
}) => {
  return (
    <li className="relative inline-block align-top group">
      <button
        type="button"
        onClick={onClick}
        className="w-[34px] h-[34px] rounded-[2px] text-white bg-[#6e7578] flex items-center justify-center mr-1 transition-colors hover:bg-[#565b5d]"
      >
        <Icon size={16} />
      </button>
      <span className="absolute z-10 hidden p-1 text-center text-white -translate-x-1/2 bg-black group-hover:block bottom-full left-1/2 text-[10px]">
        {title}
      </span>
    </li>
  );
};

export default EditorButton;
