import { BiMove } from "react-icons/bi";

const MoveButton = () => {
  return (
    <button className="flex items-center rounded-[3px] bg-black text-white w-[25px] h-[25px] text-[16px] font-bold absolute right-[5px] top-[6px] z-10 justify-center cursor-move">
      <BiMove />
    </button>
  );
};

export default MoveButton;
