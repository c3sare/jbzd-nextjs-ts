"use client";

import { GrMail } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import ActionButton from "./ActionButton";
import { useState } from "react";
import axios from "axios";

type UserActions = {
  id: string;
};

const UserActions: React.FC<UserActions> = ({ id }) => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const handleToggleBlockUser = () => {
    axios
      .post("/api/user/action", {
        method: "BLOCK",
        id,
      })
      .then(() => {
        setIsBlocked(!isBlocked);
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
