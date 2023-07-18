import getUser from "@/app/actions/getUser";
import Avatar from "./components/Avatar";
import { AiFillFlag, AiFillPicture } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { TfiCup } from "react-icons/tfi";
import Badge from "./components/Badge";

type UserProfileProps = {
  params: {
    username: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = async ({
  params: { username },
}) => {
  const user = await getUser(username);
  console.log(user);

  const date = parseISO(user!.createdAt!.$date || "");

  const accountCreateDate = user?.createdAt
    ? format(date, "dd.MM.yyyy")
    : "2023.01.01";

  return (
    <>
      <div className="flex pt-[30px] flex-wrap flex-col justify-center items-center sm:flex-row">
        <Avatar src={user.image} />
        <div className="sm:pl-[15px] flex-[1]">
          <header className="font-semibold text-[28px] mb-[10px] text-center sm:text-left">
            {user?.username}
          </header>
          <section className="flex gap-4 mb-[10px] justify-center sm:justify-normal">
            <div className="flex items-center">
              <AiFillPicture size={20} color="#888888" />
              <span className="ml-2">
                {user.posts} / {user.acceptedPosts}
              </span>
            </div>
            <div className="flex items-center">
              <FaComment size={20} color="#888888" />
              <span className="ml-2">{user.comments}</span>
            </div>
            <div className="flex items-center">
              <AiFillFlag size={20} color="#888888" />
              <span className="ml-2">{accountCreateDate}</span>
            </div>
          </section>
          <div className="mb-[10px]">
            <div className="flex gap-2 items-center justify-center sm:justify-normal">
              <Badge
                image="/images/likes/rock.png"
                name="Kamienna dzida"
                count={user.rock}
              />
              <Badge
                image="/images/likes/silver.png"
                name="Srebrna dzida"
                count={user.silver}
              />
              <Badge
                image="/images/likes/gold.png"
                name="Złota dzida"
                count={user.gold}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[max-content] sm:max-w-[125px] rounded-lg bg-[#1f1f1f] p-[5px_15px] mt-[10px] flex sm:block justify-between items-center flex-row">
          <div className="flex flex-row items-center sm:justify-between">
            <Image
              src="/images/spear.png"
              alt="Dzida"
              width={22}
              height={22}
              className="mr-[25px] sm:mr-0"
            />
            <span className="font-bold text-[22px]">{user.spears}</span>
          </div>
          <Link
            href="/ranking"
            className="flex flex-row items-center sm:justify-between"
          >
            <TfiCup className="text-[22px] mr-[25px] sm:mr-0" />
            <span className="font-bold text-[22px]">{user.rank}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
