"use client";

import { useState } from "react";
import StyledButton from "./StyledButton";
import { AiFillBell } from "@react-icons/all-files/ai/AiFillBell";
import { setCategoryAction } from "@/actions/serverActions/setCategoryAction";
import toast from "react-hot-toast";

type CategoryMethod = "" | "FOLLOW" | "BLOCK";

type CategoryHeaderProps = {
  categoryId: string;
  currentAction: CategoryMethod;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryId,
  currentAction,
}) => {
  const [method, setMethod] = useState<CategoryMethod>(currentAction);

  const handleClickMethod = async (action: CategoryMethod) => {
    const formData = new FormData();
    formData.append("id", categoryId);
    formData.append("method", action);
    const res = await setCategoryAction(formData);

    if (res?.method || res?.method === "")
      setMethod(res.method as CategoryMethod);
    else if (res?.message) {
      toast.error(res.message);
    }
  };

  const isBlocked = method === "BLOCK";

  const isFollowed = method === "FOLLOW";

  return (
    <>
      {!isFollowed && (
        <StyledButton
          active={isBlocked}
          onClick={() => handleClickMethod("BLOCK")}
        >
          {isBlocked ? "Wyłącz wyciszenie" : "Wycisz"}
        </StyledButton>
      )}
      {!isBlocked && (
        <StyledButton
          active={isFollowed}
          startIcon={AiFillBell}
          onClick={() => handleClickMethod("FOLLOW")}
        >
          {isFollowed ? "Przestań obserwować" : "Obserwuj"}
        </StyledButton>
      )}
    </>
  );
};

export default CategoryHeader;
