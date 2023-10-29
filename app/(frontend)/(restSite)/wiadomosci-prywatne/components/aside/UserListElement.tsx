import Image from "next/image";
import UserType from "../../types/UserType";
import { useRouter } from "next/navigation";
import axios from "axios";

type UserListElementProps = {
  user: UserType;
};

const UserListElement: React.FC<UserListElementProps> = ({ user }) => {
  const router = useRouter();

  const handleClickUser = () => {
    axios
      .post("/api/conversation", { userId: user.id })
      .then((res) => res.data)
      .then((data) => {
        router.push(`/wiadomosci-prywatne/rozmowa/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <li
      className="p-[5px_10px] border-b border-b-[#252525]"
      onClick={handleClickUser}
    >
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
