import getUser from "@/app/actions/getUser";
import Avatar from "./components/Avatar";
import { AiFillFlag, AiFillPicture } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { format } from "date-fns";
import Badge from "./components/Badge";
import { notFound } from "next/navigation";
import UserRank from "./components/UserRank";
import getSession from "@/app/actions/getSession";

type UserProfileProps = {
  params: {
    username: string;
  };
};

const UserProfilePage: React.FC<UserProfileProps> = async ({
  params: { username },
}) => {
  const user = await getUser(username);

  if (!user) {
    return notFound();
  }

  const accountCreateDate = user.createdAt
    ? format(user.createdAt, "dd.MM.yyyy")
    : "????.??.??";

  return (
    <>
      <div className="flex pt-[30px] flex-wrap flex-col justify-center sm:flex-row">
        <Avatar src={user.image} />
        <div className="sm:pl-[15px] flex-[1]">
          <header className="font-semibold text-[28px] mb-[10px] text-center sm:text-left">
            {user?.username}
          </header>
          <section className="flex gap-4 mb-[10px] justify-center sm:justify-normal">
            <div className="flex items-center">
              <AiFillPicture size={20} color="#888888" />
              <span className="ml-2">
                {user?.posts} / {user?.acceptedPosts}
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
        <UserRank
          email={user.email}
          id={user.id}
          rank={user.rank}
          spears={user.spears}
        />
      </div>
    </>
  );
};

export default UserProfilePage;
