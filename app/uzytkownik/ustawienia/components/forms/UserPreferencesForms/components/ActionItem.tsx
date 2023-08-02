import axios from "axios";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type ActionItemProps = {
  endpoint: string;
  id: string;
  title: string;
};

const ActionItem: React.FC<ActionItemProps> = ({ endpoint, id, title }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteFromList = () => {
    setIsLoading(true);
    axios
      .delete(endpoint + `/${id}`)
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy usuwaniu!");
        setIsLoading(false);
      });
  };

  return (
    <div className="inline-block bg-[#1f1f1f] border-4 p-[5px_8px] m-[2px] text-white border-[#1f1f1f]">
      <span className="pr-[8px] mr-[4px] text-[11px] border-r border-r-[#2f2f2f]">
        {title}
      </span>
      <button
        onClick={handleDeleteFromList}
        disabled={isLoading}
        className="text-[12px]"
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
