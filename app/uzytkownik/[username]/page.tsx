import getUser from "@/app/actions/getUser";
import Avatar from "./components/Avatar";
import { AiFillFlag, AiFillPicture } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { format } from "date-fns";

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

  const accountCreateDate = user?.createdAt
    ? format(user.createdAt, "dd.MM.yyyy")
    : "2023.01.01";

  return (
    <>
      <div className="flex pt-[30px]">
        <Avatar src={user?.image} />
        <div className="pl-[15px] flex-[1]">
          <header className="font-semibold text-[28px] mb-[10px]">
            {user.username}
          </header>
          <section className="flex gap-4">
            <div className="flex items-center">
              <AiFillPicture size={20} color="#888888" />
              <span className="ml-2">
                {user.posts?.all || 0} / {user.posts?.accepted || 0}
              </span>
            </div>
            <div className="flex items-center">
              <FaComment size={20} color="#888888" />
              <span className="ml-2">{user?.comments || 0}</span>
            </div>
            <div className="flex items-center">
              <AiFillFlag size={20} color="#888888" />
              <span className="ml-2">{accountCreateDate}</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
