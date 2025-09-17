import type { Message as MessageType } from "@prisma/client";
import { format, parseISO } from "date-fns";
import Image from "next/image";

type MessageProps = {
  message: MessageType & {
    author: {
      id: string;
      username: string | null;
      image: string | null;
    };
  };
  userId: string;
};

const Message: React.FC<MessageProps> = ({ message, userId }) => {
  const { author, addTime, body } = message;
  const { username, id, image } = author;

  const isISODate = typeof addTime === "string";

  const addTimeInDate = isISODate ? parseISO(addTime as string) : addTime;

  const addTimeFormatted = format(addTimeInDate, "yyyy-MM-dd HH:mm");

  const isOwnMessage = id === userId;

  return (
    <div className="w-[calc(100%-20px)] bg-[#252525] rounded-[10px] p-[15px] flex mb-[10px] relative">
      <div className="min-w-[35px] mr-[10px]">
        <div className="min-w-[35px] mr-[10px]">
          <Image
            height={35}
            width={35}
            className="block h-auto max-w-full rounded-full"
            src={image || "/images/avatars/default.jpg"}
            alt="Avatar"
          />
        </div>
      </div>
      <div className="max-w-[550px] grow">
        <div className="text-[#777] font-bold mb-[7px] text-[12px]">
          {username}
          {isOwnMessage ? " - Ja" : ""}
        </div>
        <div className="text-white text-[14px] break-words overflow-hidden">
          {body}
        </div>
      </div>
      <div className="text-[12px] text-[#777] italic absolute right-[15px] top-[15px]">
        {addTimeFormatted}
      </div>
    </div>
  );
};

export default Message;
