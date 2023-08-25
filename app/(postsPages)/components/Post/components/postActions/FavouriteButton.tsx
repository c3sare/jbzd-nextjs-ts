import { FaStar } from "react-icons/fa";
import PostActionLinkButton from "./PostActionLinkButton";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

  const handleToggleFavourite = () => {
    setIsLoading(true);
    axios
      .post(`/api/post/favourite/${postId}`)
      .then((res) => {
        setIsActive(res.data.isFavourite);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy dodwaniu do listy ulubionych!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PostActionLinkButton
      disabled={isLoading}
      active={isActive}
      onClick={handleToggleFavourite}
    >
      <FaStar />
    </PostActionLinkButton>
  );
};

export default FavouriteButton;
