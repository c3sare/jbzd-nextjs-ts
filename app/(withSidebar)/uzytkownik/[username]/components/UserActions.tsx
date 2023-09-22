"use client";

import { GrMail } from "@react-icons/all-files/gr/GrMail";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";

import ActionButton from "./ActionButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserActions = {
  id: string;
  isBlocked: boolean;
};

const UserActions: React.FC<UserActions> = ({ id, isBlocked: blockStatus }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(blockStatus);

  const handleStartConversation = () => {
    setIsLoading(true);
    axios
      .post("/api/conversation", { userId: id })
      .then((res) => res.data)
      .then((data) => {
        router.push(`/wiadomosci-prywatne/rozmowa/${data.id}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleToggleBlockUser = () => {
    setIsLoading(true);
    axios
      .post("/api/user/action", {
        method: "BLOCK",
        id,
      })
      .then((res) => {
        if (res.data.method === "BLOCK") setIsBlocked(true);
        else if (res.data.method === "") {
          setIsBlocked(false);
        }
        router.refresh();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full text-center md:text-left">
      <ActionButton disabled={isLoading} onClick={handleStartConversation}>
        <GrMail />
      </ActionButton>
      <ActionButton
        active={isBlocked}
        onClick={handleToggleBlockUser}
        activeIcon={<AiFillEyeInvisible />}
        disabled={isLoading}
      >
        <AiFillEye />
      </ActionButton>
    </div>
  );
};

export default UserActions;
