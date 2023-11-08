import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";

type ScoreProps = {
  value: number;
  isLoading?: boolean;
};

const Score: React.FC<ScoreProps> = ({ value, isLoading }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <p
      className={clsx(
        "mr-2 text-[14px] font-semibold leading-[24px] mb-0 ml-0.5 relative",
        isPositive ? "text-[#94b424]" : "text-[#6e7578]",
        isNegative ? "text-[#c23d3a]" : "text-[#6e7578]",
        isLoading && "text-transparent"
      )}
    >
      {value}
      {isLoading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AiOutlineLoading3Quarters className="text-white animate-spin " />
        </span>
      )}
    </p>
  );
};

export default Score;
