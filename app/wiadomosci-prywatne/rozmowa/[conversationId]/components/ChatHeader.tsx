import Image from "next/image";
import Link from "next/link";
import ActionButton from "./ActionButton";
import format from "date-fns/format";
import getTimeFromLastMessage from "../utils/getTimeFromLastMessage";

type ChatHeaderProps = {
  conversationId: string;
  user: {
    id: string;
    username: string | null;
    image: string | null;
  };
  lastMessageAt: Date | null;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversationId,
  user: { id, username, image },
  lastMessageAt,
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
      <Link href={`/uzytkownik/${username}`} className="flex-grow">
        <div className="text-white font-bold mb-[7px]">{username}</div>
        <div className="text-[#777] italic text-[12px]">
          Ostatnia wiadomość: {lastTimeMessage}
        </div>
      </Link>
      <div>
        <ActionButton>Zablokuj</ActionButton>
        <ActionButton>Usuń konwersację</ActionButton>
      </div>
    </div>
  );
};

export default ChatHeader;
