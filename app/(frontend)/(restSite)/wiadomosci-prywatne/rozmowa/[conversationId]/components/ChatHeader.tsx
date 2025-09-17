import Image from "next/image";
import Link from "next/link";
import getTimeFromLastMessage from "../utils/getTimeFromLastMessage";
import UserChatActions from "./UserChatActions";

type ChatHeaderProps = {
  conversationId: string;
  user: {
    id: string;
    username: string | null;
    image: string | null;
  };
  lastMessageAt: Date | null;
  userId: string;
  userBlockedId: string | null;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversationId,
  user: { username, image },
  lastMessageAt,
  userId,
  userBlockedId,
}) => {
  const lastTimeMessage = getTimeFromLastMessage(lastMessageAt);

  return (
    <div className="flex mb-[50px] items-center">
      <Link href={`/uzytkownik/${username}`} className="mr-[30px]">
        <Image
          width={75}
          height={75}
          className="block h-auto max-w-full rounded-full"
          src={image || "/images/avatars/default.jpg"}
          alt="Avatar"
        />
      </Link>
      <Link href={`/uzytkownik/${username}`} className="grow">
        <div className="text-white font-bold mb-[7px]">{username}</div>
        <div className="text-[#777] italic text-[12px]">
          Ostatnia wiadomość: {lastTimeMessage}
        </div>
      </Link>
      <UserChatActions
        userBlockedId={userBlockedId}
        userId={userId}
        conversationId={conversationId}
      />
    </div>
  );
};

export default ChatHeader;
