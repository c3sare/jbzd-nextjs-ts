import { BiMove } from "@react-icons/all-files/bi/BiMove";
import React from "react";

type MoveButtonProps = {
  ref?: React.Ref<HTMLDivElement>;
};

const MoveButton = (props: MoveButtonProps) => {
  return (
    <div
      className="flex items-center rounded-[3px] bg-black text-white w-[25px] h-[25px] text-[16px] font-bold absolute right-[5px] top-[6px] z-10 justify-center cursor-move"
      ref={props.ref}
    >
      <BiMove />
    </div>
  );
};

export default MoveButton;
