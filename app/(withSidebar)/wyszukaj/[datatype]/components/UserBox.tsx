import Image from "next/image";
import Link from "next/link";

type UserBoxProps = {
  user: {
    id: string;
    username: string | null;
    image: string | null;
  };
};

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  return (
    <Link
      href={`/uzytkownik/${user.username}`}
      className="flex items-center flex-nowrap"
    >
      <Image
        width={40}
        height={40}
        className="rounded-[50%] max-w-full h-auto"
        src={user.image || "/images/avatars/default.jpg"}
        alt={user.username!}
      />
      <span className="ml-[10px] mr-[25px]">{user.username}</span>
    </Link>
  );
};

export default UserBox;
