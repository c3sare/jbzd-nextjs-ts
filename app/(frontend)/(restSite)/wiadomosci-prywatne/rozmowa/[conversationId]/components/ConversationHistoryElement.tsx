"use client";

import Conversation from "@/app/(frontend)/(restSite)/wiadomosci-prywatne/types/Conversation";
import clsx from "clsx";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type ConversationHistoryElementProps = {
  conversation: Conversation;
  userId: string;
};

const ConversationHistoryElement: React.FC<ConversationHistoryElementProps> = ({
  conversation,
  userId,
}) => {
  const router = useRouter();
  const params = useParams();
  const { users, messages, lastMessageAt, id } = conversation;
  const [message] = messages;
  const [user] = users;

  const { username } = user!;

  const image = user?.image || "/images/avatars/default.jpg";

  const { body, authorId } = message!;

  const isISODate = typeof lastMessageAt === "string";

  const lastMessageDate = isISODate ? parseISO(lastMessageAt) : lastMessageAt;

  const time = format(lastMessageDate!, "HH:mm");
  const date = format(lastMessageDate!, "yyyy-MM-dd");

  const isOwnMessage = authorId === userId;

  const active = params.conversationId === id;

  const activeClassesText = active
    ? "text-black"
    : "text-[#777] group-hover/item:text-black";

  return (
    <article
      className={clsx(
        "flex p-[15px_10px] whitespace-nowrap cursor-pointer border-b border-b-[#777] my-[5px] rounded-[10px] w-[calc(100%_-_20px)] border-transparent hover:bg-[#c03e3e] group/item",
        active && "bg-[#c03e3e]"
      )}
      onClick={() =>
        router.push(`/wiadomosci-prywatne/rozmowa/${conversation.id}`)
      }
    >
      <div className="mr-[10px]">
        <Image
          src={image}
          width={35}
          height={35}
          className="block rounded-full"
          alt="Avatar"
        />
      </div>
      <div className="flex-grow mr-[10px] max-w-[calc(100%_-_35px_-_10px_-_40px)]">
        <div className="text-white">{username}</div>
        <div className={clsx("italic text-[14px]", activeClassesText)}>
          <small>
            <b>{isOwnMessage ? "Ty" : username}: </b>
            {body.slice(0, 25)}
          </small>
        </div>
      </div>
      <div
        className={clsx(
          "group-hover/item:text-black text-[12px] italic relative group/time",
          activeClassesText
        )}
      >
        <span>{time}</span>
        <span className="absolute hidden p-1 text-white bg-black rounded-md bottom-full left-1/2 translate-x-[-50%] group-hover/time:block">
          {date}
        </span>
      </div>
    </article>
  );
};

export default ConversationHistoryElement;
