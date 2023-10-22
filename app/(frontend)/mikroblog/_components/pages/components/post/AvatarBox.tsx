import Image from "next/image";
import Link from "next/link";

import Rank from "./Rank";

type AvatarBoxProps = {
  avatar?: string;
  username?: string;
};

const AvatarBox: React.FC<AvatarBoxProps> = ({
  avatar = "/images/avatars/default.jpg",
  username,
}) => {
  return (
    <div className="min-w-[50px] mr-[20px] float-left relative">
      <Link
        className="w-[50px] h-[50px] float-left rounded-full overflow-hidden relative text-[#c23d3a]"
        href={`/mikroblog/uzytkownik/${username}`}
      >
        <Image alt="Avatar" src={avatar} width={50} height={50} />
      </Link>
      <Rank className="absolute right-[-5px] bottom-[-15px]" />
    </div>
  );
};

export default AvatarBox;
