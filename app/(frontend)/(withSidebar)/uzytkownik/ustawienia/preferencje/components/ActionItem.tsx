import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { ImCross } from "@react-icons/all-files/im/ImCross";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type ActionItemProps = {
  endpoint: string;
  id: string;
  title: string;
  lockBoxes: boolean;
  setLockBoxes: Dispatch<SetStateAction<boolean>>;
};

const ActionItem: React.FC<ActionItemProps> = ({
  endpoint,
  id,
  title,
  setLockBoxes,
  lockBoxes,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteFromList = () => {
    setIsLoading(true);
    setLockBoxes(true);
    axios
      .delete(endpoint + `/${id}`)
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy usuwaniu!");
        setIsLoading(false);
      })
      .finally(() => setLockBoxes(false));
  };

  return (
    <div className="inline-block bg-[#1f1f1f] border-4 p-[5px_8px] m-[2px] text-white border-[#1f1f1f]">
      <span className="pr-[8px] mr-[4px] text-[11px] border-r border-r-[#2f2f2f]">
        {title}
      </span>
      <button
        onClick={handleDeleteFromList}
        disabled={lockBoxes}
        className="text-[12px] disabled:opacity-60"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <ImCross />
        )}
      </button>
    </div>
  );
};

export default ActionItem;
