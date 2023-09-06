import { FaStar } from "@react-icons/all-files/fa/FaStar";
import PostActionLinkButton from "./PostActionLinkButton";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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

  if (!isLoggedIn) return null;

  const handleToggleFavourite = async () => {
    setIsLoading(true);
    // /api/post/favourite/${postId}
    const res = await setFavouritePost(postId);
    if (typeof res.isFavourite === "boolean") {
      setIsActive(res.isFavourite);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };

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
