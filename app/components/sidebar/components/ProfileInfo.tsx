import { FaComment } from "react-icons/fa";
import { AiFillPicture, AiFillFlag } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getProfileInfo } from "@/app/actions/getProfileInfo";
import SignOutButton from "./SignOutButton";

const ProfileInfo = async () => {
  const user = await getProfileInfo();

  if (!user) return <div>Wystąpił błąd przy wczytywaniu profilu!</div>;

  const linkItemClassNames =
    "flex w-[calc(100%/3)] h-full justify-center items-center hover:bg-[#181818]";

  const accountCreateDate = user?.createdAt
    ? format(user.createdAt, "dd.MM.yyyy")
    : "2023.01.01";

  return (
    <div className="p-[25px_10px] pt-[10px]">
      <div className="flex justify-between">
        <Link href={`/uzytkownik/${user.username}`}>
          <Image
            src={user.image || "/images/avatars/default.jpg"}
            height={118}
            width={118}
            alt="Avatar"
            className="mb-1"
          />
        </Link>
        <div className="flex-[1] ml-[5px]">
          <header className="text-white] relative bg-[#181818] p-[8px_10px] flex justify-between items-center">
            <Link href={`/uzytkownik/${user.username}`}>{user.username}</Link>
            <SignOutButton />
          </header>
          <section className="text-[12px] pt-[10px] text-white flex flex-col gap-1">
            <p className="flex items-center">
              <AiFillPicture size={20} color="#888888" />
              <span className="ml-2">
                {user.posts} / {user.acceptedPosts}
              </span>
            </p>
            <p className="flex items-center">
              <FaComment size={20} color="#888888" />
              <span className="ml-2">{user.comments}</span>
            </p>
            <p className="flex items-center">
              <AiFillFlag size={20} color="#888888" />
              <span className="ml-2">{accountCreateDate}</span>
            </p>
          </section>
        </div>
      </div>
      <div className="flex bg-[#252525] h-[40px]">
        <Link
          href={`/uzytkownik/${user.username}`}
          className={linkItemClassNames}
        >
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
