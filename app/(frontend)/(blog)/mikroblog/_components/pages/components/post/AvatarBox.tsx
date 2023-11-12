import Image from "next/image";
import Link from "next/link";

import Rank from "./Rank";

type AvatarBoxProps = {
  avatar?: string;
  userId: string;
  username: string;
};

const AvatarBox: React.FC<AvatarBoxProps> = ({
  avatar = "/images/avatars/default.jpg",
  userId,
  username,
}) => {
  return (
    <div className="min-w-[50px] mr-[20px] hidden md:block">
      <div className="relative">
        <Link
          className="w-[50px] h-[50px] float-left rounded-full overflow-hidden text-[#c23d3a]"
          href={`/mikroblog/uzytkownik/${userId}/${username}`}
        >
          <Image alt="Avatar" src={avatar} width={50} height={50} />
        </Link>
        <Rank className="absolute right-[-5px] bottom-[-60px]" />
      </div>
    </div>
  );
};

export default AvatarBox;
