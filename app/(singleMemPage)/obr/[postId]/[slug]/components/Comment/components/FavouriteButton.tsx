"use client";

import { FaStar } from "@react-icons/all-files/fa/FaStar";
import CommentButton from "./CommentButton";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type FavouriteButtonProps = {
  postId: string;
  commentId: string;
  defaultActive?: boolean;
};

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  postId,
  commentId,
  defaultActive,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(defaultActive || false);

  const handleToggleFavoruite = () => {
    setIsLoading(true);
    axios
      .post(`/api/post/${postId}/comment/${commentId}/favourite`)
      .then((res) => {
        if (typeof res.data?.isFavourite === "boolean")
          setActive(res.data.isFavourite);
        else toast.error(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CommentButton
      onClick={handleToggleFavoruite}
      disabled={isLoading}
      active={active}
      icon={FaStar}
    >
      Ulubione
    </CommentButton>
  );
};

export default FavouriteButton;
