import axios from "axios";
import { toast } from "react-hot-toast";

type FollowBlockListProps = {
  title: string;
  deleteItemEndpoint: string;
};

const FollowBlockList: React.FC<FollowBlockListProps> = ({
  title,
  deleteItemEndpoint,
}) => {
  const handleDeleteItem = (id: string) => {
    axios
      .post(deleteItemEndpoint, { id })
      .then()
      .catch((err) => {
        toast.error("Wystąpił błąd przy usuwaniu!");
        console.log(err);
      });
  };

  return (
    <div>
      <h3>{title}</h3>
      <div></div>
    </div>
  );
};

export default FollowBlockList;
