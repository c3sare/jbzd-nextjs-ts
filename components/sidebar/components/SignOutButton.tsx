"use client";

import { signOut } from "next-auth/react";
import { FaPowerOff } from "@react-icons/all-files/fa/FaPowerOff";

const SignOutButton = () => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
      className="text-neutral-500"
    >
      <FaPowerOff />
    </button>
  );
};

export default SignOutButton;
