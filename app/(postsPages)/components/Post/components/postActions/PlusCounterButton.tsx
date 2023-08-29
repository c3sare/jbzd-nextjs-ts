import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [plusCount, setPlusCount] = useState<number>(pluses);
  const [plused, setPlused] = useState<boolean>(isPlused);

  const handleAddVote = () => {
    setIsLoading(true);
    axios
      .post(`/api/post/vote/${postId}`)
      .then((res) => {
        setPlused(res.data.isPlused);
        setPlusCount(res.data.count);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy dodawaniu głosu!");
      })
      .finally(() => setIsLoading(false));
  };

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
            "w-full md:w-[51px] h-[45px] mb-[3px] flex items-center justify-center rounded-[2px] bg-gradient-to-r",
            plused
              ? "from-[#94b425] to-[#87a61c]"
              : "from-[#c03e3e] to-[#ac2f2f]"
          )}
        >
          <span className="hidden md:block text-[32px] font-semibold leading-[0px] text-[rgba(255,_255,_255,_.7)]">
            +
          </span>
          <span className="md:hidden inline font-bold text-[22px]">
            +{plusCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PlusCounterButton;
