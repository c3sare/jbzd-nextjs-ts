"use client";

import CoinsBox from "./components/CoinsBox";
import MessagesButton from "./components/MessagesButton";
import NotificationsButton from "./components/NotificationsButton";

import Conversation from "@/app/wiadomosci-prywatne/types/Conversation";
import NotificationType from "@/app/(withSidebar)/uzytkownik/notyfikacje/types/NotificationType";

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
  return (
    <div className="flex items-center text-right justify-end h-full">
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
