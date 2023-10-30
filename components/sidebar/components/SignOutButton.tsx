"use client";

import { FaPowerOff } from "@react-icons/all-files/fa/FaPowerOff";
import { signOutAction } from "./actions/signOutAction";

const SignOutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOutAction();
      }}
      className="text-neutral-500"
    >
      <FaPowerOff />
    </button>
  );
};

export default SignOutButton;
