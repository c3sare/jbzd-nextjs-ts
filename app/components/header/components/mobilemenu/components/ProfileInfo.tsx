"use client";

import { FaPowerOff } from "react-icons/fa";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Avatar from "@/app/components/Avatar";
import IconButton from "@/app/components/IconButton";
import { User } from "next-auth";

const ProfileInfo = () => {
  const session = useSession();
  const { username, image } = session.data?.user as User & { username: string };

  return (
    <div className="flex flex-wrap m-[0_auto] p-[10px_15px] items-center text-white">
      <Link
        href="/uzytkownik/c3sare"
        className="flex gap-1 items-center mr-[5px]"
      >
        <Avatar src={image || "/images/avatars/default.jpg"} size={30} />
        <span className="font-bold ml-[5px] text-[16px]">c3sare</span>
      </Link>
      <IconButton className="ml-[5px]" onClick={() => signOut()}>
        <FaPowerOff color="#888888" />
      </IconButton>
    </div>
  );
};

export default ProfileInfo;
