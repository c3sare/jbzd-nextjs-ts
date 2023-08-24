import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

type PlusCounterButtonProps = {
  pluses: number;
};

const PlusCounterButton: React.FC<PlusCounterButtonProps> = ({ pluses }) => {
  const [plusCount, setPlusCount] = useState<number>(pluses);
  return (
    <div>
      <div>
        <span className="text-[14px] text-white w-[51px] h-[45px] mb-[3px] flex justify-center items-center text-center">
          + {plusCount}
        </span>
        <button className="bg-gradient-to-r from-[#c03e3e] to-[#ac2f2f] w-[51px] h-[45px] mb-[3px] flex items-center justify-center rounded-[2px] text-[32px] font-semibold leading-[0px] text-[rgba(255,_255,_255,_.7)]">
          +
        </button>
      </div>
    </div>
  );
};

export default PlusCounterButton;
