import axios from "axios";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";

type ActionItemProps = {
  endpoint: string;
  id: string;
  title: string;
  deleteFunction: (id: string) => void;
};

const ActionItem: React.FC<ActionItemProps> = ({
  endpoint,
  id,
  title,
  deleteFunction,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteFromList = () => {
    setIsLoading(true);
    axios
      .post(endpoint, { id })
      .then(() => {
        deleteFunction(id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy usuwaniu!");
        setIsLoading(false);
      });
  };

  return (
    <div className="inline-block bg-[#1f1f1f] border-4 p-[5px_8px] m-[2px] text-white border-[#1f1f1f]">
      <span className="pr-[8px] mr-[4px] text-[12px] border-r border-r-[#2f2f2f]">
        {title}
      </span>
      <button onClick={handleDeleteFromList} disabled={isLoading}>
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
