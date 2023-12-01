import { FaStar } from "@react-icons/all-files/fa/FaStar";
import PostActionLinkButton from "./PostActionLinkButton";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import setFavouritePost from "../../actions/setFavouritePost";

type FavouriteButtonProps = {
  postId: string;
  isLoggedIn: boolean;
  isFavourite: boolean;
};

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  postId,
  isLoggedIn,
  isFavourite,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(isFavourite);

  const handleToggleFavourite = useCallback(async () => {
    setIsLoading(true);
    // /api/post/favourite/${postId}
    const res = await setFavouritePost(postId);
    if (typeof res.isFavourite === "boolean") {
      setIsActive(res.isFavourite);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  }, [postId]);

  if (!isLoggedIn) return null;

  return (
    <PostActionLinkButton
      disabled={isLoading}
      active={isActive}
      isLoading={isLoading}
      onClick={handleToggleFavourite}
    >
      <FaStar />
    </PostActionLinkButton>
  );
};

export default FavouriteButton;
