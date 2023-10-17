import Link from "next/link";

import Avatar from "@/components/Avatar";
import { getProfileInfo } from "@/actions/getProfileInfo";
import SignOutButton from "./SignOutButton";

const ProfileInfo = async () => {
  const user = await getProfileInfo();

  return (
    <div className="flex flex-wrap m-[0_auto] p-[10px_15px] items-center text-white">
      <Link
        href={"/uzytkownik/" + user?.username}
        className="flex gap-1 items-center mr-[5px]"
        prefetch={false}
      >
        <Avatar src={user?.image || "/images/avatars/default.jpg"} size={30} />
        <span className="font-bold ml-[5px] text-[16px]">{user?.username}</span>
      </Link>
      <SignOutButton />
    </div>
  );
};

export default ProfileInfo;
