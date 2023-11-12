import { RiCheckboxBlankCircleLine } from "@react-icons/all-files/ri/RiCheckboxBlankCircleLine";
import { RiCheckboxCircleFill } from "@react-icons/all-files/ri/RiCheckboxCircleFill";
import { ImCheckboxUnchecked } from "@react-icons/all-files/im/ImCheckboxUnchecked";
import { ImCheckboxChecked } from "@react-icons/all-files/im/ImCheckboxChecked";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type SurveyAnswerProps = {
  answer: {
    id: number;
    title: string;
    votes: number;
    isMarked?: boolean;
  };
  voteCount: number;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  markOption: "single" | "multiple";
  disabled?: boolean;
};

const SurveyAnswer: React.FC<SurveyAnswerProps> = ({
  answer,
  voteCount,
  onClick,
  markOption,
  disabled,
}) => {
  const votePercent = (answer.votes / voteCount || 0) * 100;

  const icons = {
    single: [RiCheckboxBlankCircleLine, RiCheckboxCircleFill],
    multiple: [ImCheckboxUnchecked, ImCheckboxChecked],
  };

  const Icon = icons[markOption][Number(!!answer.isMarked)]!;

  const percentText = `${votePercent.toFixed(2)}%`;

  return (
    <li key={answer.id} className="w-full mb-[8px] group/survey relative">
      <button
        onClick={onClick}
        className="p-[5px_10px] w-full flex items-center justify-between bg-[#1f1f1f] relative disabled:opacity-30"
        disabled={disabled}
      >
        <span
          style={{ width: `${Math.round(Math.round(votePercent))}%` }}
          className="absolute h-full left-0 top-0 bg-[#6e7578] transition-[width]"
        />
        <span className="flex gap-2 items-center text-[15px] z-10">
          <Icon />
          <span>{answer.title}</span>
        </span>
        <span className="z-10">{percentText}</span>
      </button>
      <span
        className={clsx(
          "hidden group-hover/survey:flex items-center justify-center flex-col bg-black absolute bottom-[calc(100%_+_6px)] left-1/2 -translate-x-1/2 text-[9px] px-4 py-1",
          "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-black after:border-t-[5px] after:border-l-[5px] after:border-r-[5px] after:border-b-0 after:border-l-transparent after:border-r-transparent after:border-b-transparent"
        )}
      >
        <span>{percentText}</span>
        <span>({answer.votes} głosów)</span>
      </span>
    </li>
  );
};

export default SurveyAnswer;
