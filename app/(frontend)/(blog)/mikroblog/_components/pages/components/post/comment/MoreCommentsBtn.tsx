import { IoMdRefresh } from "@react-icons/all-files/io/IoMdRefresh";
import { ButtonHTMLAttributes } from "react";

type MoreCommentsBtn = {
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const MoreCommentsBtn: React.FC<MoreCommentsBtn> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="gap-1 mx-auto h-[28px] rounded-[3px] leading-[28px] bg-[#4a4a4a] text-[12px] text-white font-semibold text-center flex items-center justify-center px-[15px] transition-colors hover:bg-black"
    >
      <IoMdRefresh className="text-[20px]" />
      <span>Doładuj więcej komentarzy</span>
    </button>
  );
};

export default MoreCommentsBtn;
