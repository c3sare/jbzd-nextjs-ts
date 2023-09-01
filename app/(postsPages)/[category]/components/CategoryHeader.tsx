"use client";

import { useState } from "react";
import StyledButton from "./StyledButton";
import { AiFillBell } from "@react-icons/all-files/ai/AiFillBell";
import { useSession } from "next-auth/react";

type CategoryMethod = "" | "FOLLOW" | "BLOCK";

const CategoryHeader = () => {
  const session = useSession();
  const [method, setMethod] = useState<CategoryMethod>("");

  const isLoggedIn = session.status === "authenticated";

  const handleClickMethod = (action: CategoryMethod) => {
    if (action === method) {
      setMethod("");
    } else {
      setMethod(action);
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
