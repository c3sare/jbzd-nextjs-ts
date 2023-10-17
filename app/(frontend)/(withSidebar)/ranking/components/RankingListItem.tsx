import Link from "next/link";
import { AiFillTrophy } from "@react-icons/all-files/ai/AiFillTrophy";
import Image from "next/image";

type RankingListItemProps = {
  username: string;
  rank: number;
  image?: string;
  spears: number;
};

const RankingListItem: React.FC<RankingListItemProps> = ({
  username,
  rank,
  image,
  spears,
}) => {
  return (
    <Link
      href={`/uzytkownik/${username}`}
      className="p-[7px_15px] w-full flex items-center border-b border-b-[#1f1f1f] last-of-type:border-b-transparent"
    >
      <div className="mr-[10px] w-[75px] text-[14px] flex items-center">
        <AiFillTrophy className="mr-2" />
        <span>{rank}.</span>
      </div>
      <div className="mr-[10px]">
        <Image
          src={image || "/images/avatars/default.jpg"}
          alt={`Avatar użytkownika ${username}`}
          height={25}
          width={25}
          className="rounded-full"
        />
      </div>
      <div className="mr-[10px]">{username}</div>
      <div className="ml-auto mr-[10px] text-[#f0cc00] font-bold flex items-center">
        <Image
          src="/images/spear.png"
          alt="Dzida"
          width={22}
          height={22}
          className="mr-[5px]"
        />
        <span>{spears}</span>
      </div>
    </Link>
  );
};

export default RankingListItem;
