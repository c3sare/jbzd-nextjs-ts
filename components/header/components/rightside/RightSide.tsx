"use client";

import CoinsBox from "./components/CoinsBox";
import MessagesButton from "./components/MessagesButton";
import NotificationsButton from "./components/NotificationsButton";

import Conversation from "@/app/(frontend)/wiadomosci-prywatne/types/Conversation";
import NotificationType from "@/app/(frontend)/(withSidebar)/uzytkownik/notyfikacje/types/NotificationType";
import { useEffect } from "react";
import { pusherClient } from "@/libs/pusher";

type RightSideProps = {
  userId?: string;
  messages: Conversation[];
  notifications: NotificationType[];
};

const RightSide: React.FC<RightSideProps> = ({
  userId,
  messages,
  notifications,
}) => {
  useEffect(() => {
    if (userId) pusherClient.subscribe(userId);

    return () => {
      if (userId) pusherClient.unsubscribe(userId);
    };
  }, [userId]);

  return (
    <div className="flex items-center justify-end h-full text-right">
      <CoinsBox />
      {Boolean(userId) && (
        <>
          <MessagesButton userId={userId!} initialMessages={messages} />
          <NotificationsButton
            userId={userId!}
            initialNotifications={notifications}
          />
        </>
      )}
    </div>
  );
};

export default RightSide;
