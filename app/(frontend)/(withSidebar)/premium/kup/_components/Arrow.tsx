import { DOMAttributes } from "react";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import clsx from "clsx";

type ArrowProps = {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  direction: "left" | "right";
  disabled?: boolean;
};

const icons = {
  left: FiChevronLeft,
  right: FiChevronRight,
};

const Arrow: React.FC<ArrowProps> = (props) => {
  const Icon = icons[props.direction];

  const className = {
    left: "left-0",
    right: "right-0",
  };

  return (
    <button
      onClick={props?.onClick}
      className={clsx(
        "bg-white rounded-full w-[45px] h-[45px] shadow-xl flex justify-center items-center absolute top-1/2 translate-y-[-50%]",
        className[props.direction]
      )}
    >
      <Icon className="text-[36px] text-black" />
    </button>
  );
};

export default Arrow;
