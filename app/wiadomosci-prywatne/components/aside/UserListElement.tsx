import Image from "next/image";
import UserType from "../../types/UserType";

type UserListElementProps = {
  user: UserType;
};

const UserListElement: React.FC<UserListElementProps> = ({ user }) => {
  return (
    <li className="p-[5px_10px] border-b border-b-[#252525]">
      <div className="flex items-center cursor-pointer">
        <div className="mr-[10px]">
          <Image
            src={user?.image || "/images/avatars/default.jpg"}
            alt="Avatar"
            width={25}
            height={25}
            className="block max-w-full rounded-full"
          />
        </div>
        <div className="ml-1 text-white">{user.username}</div>
      </div>
    </li>
  );
};

export default UserListElement;
