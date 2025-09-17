import rankBg from "@/public/images/ranks.png";
import clsx from "clsx";
import { HTMLAttributes } from "react";

type RankProps = {
  className?: HTMLAttributes<HTMLSpanElement>["className"];
};

const Rank: React.FC<RankProps> = ({ className }) => {
  return (
    <span
      className={clsx(
        "z-8 inline-block w-[28px] h-[28px] rounded-full float-left group/avatar",
        className
      )}
      style={{
        backgroundPosition: "-84px 0",
        background: `url(${rankBg.src}) no-repeat 0 0`,
      }}
    >
      <span className="absolute hidden p-0.5 -translate-x-1/2 bg-black bottom-full left-1/2 text-[12px] text-center min-w-[75px] group-hover/avatar:block">
        Banan
      </span>
    </span>
  );
};

export default Rank;
