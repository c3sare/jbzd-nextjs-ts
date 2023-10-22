import clsx from "clsx";

type ScoreProps = {
  value: number;
};

const Score: React.FC<ScoreProps> = ({ value }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <p
      className={clsx(
        "mr-2 text-[14px] font-semibold leading-[24px] mb-0 ml-0.5",
        isPositive ? "text-[#94b424]" : "text-[#6e7578]",
        isNegative ? "text-[#c23d3a]" : "text-[#6e7578]"
      )}
    >
      {value}
    </p>
  );
};

export default Score;
