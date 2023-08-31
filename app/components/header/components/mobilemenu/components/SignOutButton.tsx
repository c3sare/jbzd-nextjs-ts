"use client";

import IconButton from "@/app/components/IconButton";
import { signOut } from "next-auth/react";
import { FaPowerOff } from "@react-icons/all-files/fa/FaPowerOff";

const SignOutButton = () => {
  return (
    <IconButton className="ml-[5px]" onClick={() => signOut()}>
      <FaPowerOff color="#888888" />
    </IconButton>
  );
};

export default SignOutButton;
