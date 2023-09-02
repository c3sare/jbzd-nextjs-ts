"use client";

import { useState } from "react";
import StyledButton from "./StyledButton";
import { AiFillBell } from "@react-icons/all-files/ai/AiFillBell";
import { useSession } from "next-auth/react";
import { setCategoryAction } from "@/app/actions/setCategoryAction";
import toast from "react-hot-toast";

type CategoryMethod = "" | "FOLLOW" | "BLOCK";

type CategoryHeaderProps = {
  categoryId: string;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryId }) => {
  const session = useSession();
  const [method, setMethod] = useState<CategoryMethod>("");

  const isLoggedIn = session.status === "authenticated";

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
    isLoggedIn && (
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
    )
  );
};

export default CategoryHeader;
