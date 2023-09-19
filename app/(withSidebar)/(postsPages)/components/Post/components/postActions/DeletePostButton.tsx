import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import PostActionLinkButton from "./PostActionLinkButton";
import { useCallback, useContext } from "react";
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

  const deletePost = useCallback(async () => {
    const res = await deletePostAction(postId);
    // /api/post/ (DELETE)
    if (res.deleted) {
      toast.success("Pomyślnie usunięto post!");
      router.push("/");
      router.refresh();
    } else {
      toast.error(res.message!);
    }
    monit!.close();
  }, [postId, monit, router]);

  const handleClickDeleteButton = useCallback(() => {
    monit!.create!("Usuwanie", "Na pewno chcesz usunąć tego mema?", deletePost);
  }, [deletePost, monit]);

  if (!isLoggedIn || !isOwnPost) return null;

  return (
    <PostActionLinkButton onClick={handleClickDeleteButton}>
      <FaTrash />
    </PostActionLinkButton>
  );
};

export default DeletePostButton;
