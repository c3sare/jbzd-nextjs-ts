"use client";

import { GrMail } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  const [isBlocked, setIsBlocked] = useState<boolean>(blockStatus);

  const handleToggleBlockUser = () => {
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
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
      <ActionButton>
        <GrMail />
      </ActionButton>
      <ActionButton
        active={isBlocked}
        onClick={handleToggleBlockUser}
        activeIcon={<AiFillEyeInvisible />}
      >
        <AiFillEye />
      </ActionButton>
    </div>
  );
};

export default UserActions;