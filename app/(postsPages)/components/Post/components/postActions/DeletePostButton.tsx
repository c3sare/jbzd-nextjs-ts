import { FaTrash } from "react-icons/fa";
import PostActionLinkButton from "./PostActionLinkButton";
import { useContext } from "react";
import { MonitProvider } from "@/app/context/MonitContext";
import axios from "axios";
import toast from "react-hot-toast";

type DeletePostButtonProps = {
  isLoggedIn: boolean;
  postId: string;
  isOwnPost: boolean;
};

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  isLoggedIn,
  postId,
  isOwnPost,
}) => {
  const monit = useContext(MonitProvider);

  if (!isLoggedIn || !isOwnPost) return null;

  const deletePost = () => {
    axios
      .delete(`/api/post/${postId}`)
      .then(() => {
        toast.success("Pomyślnie usunięto post!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy usuwaniu!");
      })
      .finally(monit!.close);
  };

  const handleClickDeleteButton = () => {
    monit!.create!("Usuwanie", "Na pewno chcesz usunąć tego mema?", deletePost);
  };

  return (
    <PostActionLinkButton onClick={handleClickDeleteButton}>
      <FaTrash />
    </PostActionLinkButton>
  );
};

export default DeletePostButton;
