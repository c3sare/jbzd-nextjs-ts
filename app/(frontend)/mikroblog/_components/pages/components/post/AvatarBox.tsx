import Image from "next/image";
import Link from "next/link";

import rankBg from "@/public/images/ranks.png";

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
        href="/mikroblog/uzytkownik/c3sare"
      >
        <Image
          alt="Avatar"
          src="/images/avatars/default.jpg"
          width={50}
          height={50}
        />
      </Link>
      <span
        className="absolute right-[-5px] bottom-[-15px] z-[8] inline-block w-[28px] h-[28px] rounded-full float-left group"
        style={{
          backgroundPosition: "-84px 0",
          background: `url(${rankBg.src}) no-repeat 0 0`,
        }}
      >
        <span className="absolute hidden p-0.5 -translate-x-1/2 bg-black bottom-full left-1/2 text-[9px] text-center min-w-[75px] group-hover:block">
          Banan
        </span>
      </span>
    </div>
  );
};

export default AvatarBox;
