import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import PostActionLinkButton from "./PostActionLinkButton";
import { useContext } from "react";
import { MonitProvider } from "@/app/context/MonitContext";
import toast from "react-hot-toast";
import deletePostAction from "../../actions/deletePost";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const monit = useContext(MonitProvider);

  if (!isLoggedIn || !isOwnPost) return null;

  const deletePost = async () => {
    const res = await deletePostAction(postId);
    // /api/post/ (DELETE)
    if (res.deleted) {
      toast.success("Pomyślnie usunięto post!");
      router.push("/");
    } else {
      toast.error(res.message!);
    }
    monit!.close();
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
