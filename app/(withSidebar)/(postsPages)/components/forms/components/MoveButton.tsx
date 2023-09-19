import { forwardRef } from "react";
import { BiMove } from "@react-icons/all-files/bi/BiMove";

const MoveButton = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  return (
    <div
      className="flex items-center rounded-[3px] bg-black text-white w-[25px] h-[25px] text-[16px] font-bold absolute right-[5px] top-[6px] z-10 justify-center cursor-move"
      ref={ref}
    >
      <BiMove />
    </div>
  );
});

MoveButton.displayName = "MoveButton";

export default MoveButton;
