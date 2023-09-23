"use client";

import type Conversation from "@/app/wiadomosci-prywatne/types/Conversation";

import { BsFillEnvelopeFill } from "@react-icons/all-files/bs/BsFillEnvelopeFill";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import IconButton from "@/app/components/IconButton";
import DropdownContainer from "../../DropdownContainer";
import CountBox from "./CountBox";
import { pusherClient } from "@/app/libs/pusher";
import { Message } from "@prisma/client";

type MessagesButtonProps = {
  userId: string;
  initialMessages: Conversation[];
};

type UpdateMessage = {
  id: string;
  messages: Message[];
};

const MessagesButton: React.FC<MessagesButtonProps> = ({
  userId,
  initialMessages,
}) => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialMessages);
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  useEffect(() => {
    pusherClient.subscribe(userId);
    const handleAddMessages = (conversation: Conversation) => {
      setConversations((prev) => {
        const newState = prev.filter((item) => item.id !== conversation.id);

        return [conversation, ...newState];
      });
    };

    const handleUpdateMessages = (conversation: UpdateMessage) => {
      console.log(conversation);
      setConversations((prev) => {
        return [...prev].map((item) => {
          if (item.id === conversation.id) {
            item.messages[0].seenIds = conversation.messages[0].seenIds;
          }
          return item;
        });
      });
    };

    pusherClient.bind("xmessages:new", handleAddMessages);
    pusherClient.bind("xmessages:update", handleUpdateMessages);
  }, [userId]);

  const unSeenCount = conversations.filter(
    (item) => !item.messages[0].seenIds.find((subitem) => subitem === userId)
  ).length;

  return (
    <div
      className="inline-flex items-center text-left ml-[15px] h-full lg:relative"
      ref={containerRef}
    >
      <IconButton onClick={toggleVisible}>
        <BsFillEnvelopeFill />
        <CountBox count={unSeenCount} />
      </IconButton>
      {isVisible && (
        <DropdownContainer>
          <ul className="flex flex-col p-0 m-0 bg-[#181818] w-full">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className="w-full float-none block m-0 p-[7px_5px] border-b border-b-[#1f1f1f] bg-[#313131]"
              >
                <Link
                  className="w-full h-full text-[11px] text-white p-[5px_10px] overflow-hidden flex items-center"
                  href={`/wiadomosci-prywatne/rozmowa/${conversation.id}`}
                >
                  <Image
                    src={
                      conversation.users[0].image ||
                      "/images/avatars/default.jpg"
                    }
                    width={30}
                    height={30}
                    className="mr-[10px] rounded-full max-w-full h-auto"
                    alt="Avatar"
                  />
                  <div>
                    <div className="text-[#777] font-bold">
                      {conversation.users[0].username}
                    </div>
                    <p className="m-0 text-white">
                      {conversation.messages[0].body.slice(0, 25)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col h-[30px] w-full items-center justify-center bg-[#1f1f1f] border-t border-[#313131]">
            <Link
              className="text-[11px] text-[#6e7578] p-0"
              href="/wiadomosci-prywatne"
              prefetch={false}
            >
              Zobacz wszystkie
            </Link>
          </div>
        </DropdownContainer>
      )}
    </div>
  );
};

export default MessagesButton;
