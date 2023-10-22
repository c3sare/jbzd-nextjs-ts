import Link from "next/link";
import Image from "next/image";
import Rank from "../../Rank";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";
import clsx from "clsx";

type VoterItemProps = {
  user: {
    id: string;
    username?: string;
    image?: string;
    vote: "PLUS" | "MINUS";
  };
};

const VoterItem: React.FC<VoterItemProps> = ({ user }) => {
  const icons = {
    PLUS: {
      icon: BiPlus,
      className: "bg-[#94b424]",
    },
    MINUS: {
      icon: BiMinus,
      className: "bg-[#c23d3a]",
    },
  };

  const Icon = icons[user.vote].icon;

  const classNameIconContainer = icons[user.vote].className;

  return (
    <div className="flex w-full mb-[5px] items-center">
      <div className="relative">
        <Rank className="scale-[.6] absolute bottom-[-10px] left-[12px]" />
        <Link
          className="flex items-center text-white gap-2"
          href={`/mikroblog/uzytkownik/${user.username}`}
        >
          <Image
            src={user.image || "/images/avatars/default.jpg"}
            alt="Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span>{user.username}</span>
        </Link>
      </div>
      <span
        className={clsx(
          "w-[24px] h-[24px] mr-0 ml-auto text-white flex items-center justify-center",
          classNameIconContainer
        )}
      >
        <Icon size={20} />
      </span>
    </div>
  );
};

export default VoterItem;
