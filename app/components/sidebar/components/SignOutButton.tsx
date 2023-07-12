"use client";

import { signOut } from "next-auth/react";
import { FaPowerOff } from "react-icons/fa";

const SignOutButton = () => {
  return (
    <button onClick={() => signOut()} className="text-neutral-500">
      <FaPowerOff />
    </button>
  );
};

export default SignOutButton;
