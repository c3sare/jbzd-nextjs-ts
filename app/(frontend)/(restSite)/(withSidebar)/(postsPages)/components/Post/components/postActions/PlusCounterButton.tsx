"use client";

import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import clsx from "clsx";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import setPostVote from "../../actions/setPostVote";

type PlusCounterButtonProps = {
  pluses: number;
  isPlused: boolean;
  postId: string;
};

const PlusCounterButton: React.FC<PlusCounterButtonProps> = ({
  pluses,
  isPlused,
  postId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plusCount, setPlusCount] = useState<number>(pluses);
  const [plused, setPlused] = useState<boolean>(isPlused);

  const handleAddVote = useCallback(async () => {
    setIsLoading(true);
    const res = await setPostVote(postId);
    // /api/post/vote
    if (typeof res?.count === "number") {
      setPlusCount(res.count);
      setPlused(res.isPlused);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  }, [postId]);

  return (
    <div className="w-full md:w-auto">
      <div className="w-full md:w-auto">
        <span className="hidden md:flex text-[14px] text-white w-[51px] h-[45px] mb-[3px] justify-center items-center text-center">
          + {plusCount}
        </span>
        <button
          disabled={isLoading}
          onClick={handleAddVote}
          className={clsx(
            "w-full md:w-[51px] h-[45px] mb-[3px] flex items-center justify-center rounded-[2px] bg-linear-to-r",
            plused
              ? "from-[#94b425] to-[#87a61c]"
              : "from-[#c03e3e] to-[#ac2f2f]",
            isLoading && "opacity-60"
          )}
        >
          <span className="hidden md:block text-[32px] font-semibold leading-[0px] text-[rgba(255,255,255,.7)]">
            {isLoading ? (
              <BiLoaderAlt className="animate-spin text-[26px] mx-auto" />
            ) : (
              "+"
            )}
          </span>
          <span className="md:hidden inline font-bold text-[22px]">
            {isLoading ? (
              <BiLoaderAlt className="animate-spin text-[26px] mx-auto" />
            ) : (
              "+" + plusCount
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PlusCounterButton;
