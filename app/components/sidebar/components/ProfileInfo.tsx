"use client";

import { FaPowerOff, FaComment } from "react-icons/fa";
import { AiFillPicture, AiFillFlag } from "react-icons/ai";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";

const ProfileInfo = () => {
  const session = useSession();
  const { username, image, createdAt } = session.data?.user as User & {
    username: string;
    createdAt: string;
  };

  console.log(createdAt);

  const linkItemClassNames =
    "flex w-[calc(100%/3)] h-full justify-center items-center hover:bg-[#181818]";

  const accountCreateDate = format(parseISO(createdAt), "dd.MM.yyyy");

  return (
    <div className="p-[25px_10px] pt-[10px]">
      <div className="flex justify-between">
        <Link href={`/uzytkownik/${username}`}>
          <Image
            src={image || "/images/avatars/default.jpg"}
            height={118}
            width={118}
            alt="Avatar"
            className="mb-1"
          />
        </Link>
        <div className="flex-[1] ml-[5px]">
          <header className="text-white] relative bg-[#181818] p-[8px_10px] flex justify-between items-center">
            <Link href={`/uzytkownik/${username}`}>{username}</Link>
            <button onClick={() => signOut()} className="text-neutral-500">
              <FaPowerOff />
            </button>
          </header>
          <section className="text-[12px] pt-[10px] text-white flex flex-col gap-1">
            <p className="flex items-center">
              <AiFillPicture size={20} color="#888888" />
              <span className="ml-2">0 / 0</span>
            </p>
            <p className="flex items-center">
              <FaComment size={20} color="#888888" />
              <span className="ml-2">0</span>
            </p>
            <p className="flex items-center">
              <AiFillFlag size={20} color="#888888" />
              <span className="ml-2">{accountCreateDate}</span>
            </p>
          </section>
        </div>
      </div>
      <div className="flex bg-[#252525] h-[40px]">
        <Link href={`/uzytkownik/${username}`} className={linkItemClassNames}>
          Mój profil
        </Link>
        <Link href="/uzytkownik/ustawienia" className={linkItemClassNames}>
          Ustawienia
        </Link>
        <Link href="/ulubione" className={linkItemClassNames}>
          Ulubione
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
