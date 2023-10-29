"use client";

import NotificationType from "@/app/(frontend)/(restSite)/(withSidebar)/uzytkownik/notyfikacje/types/NotificationType";
import { useEffect } from "react";
import { pusherClient } from "@/libs/pusher";
import NotificationsButton from "@/components/header/components/rightside/components/NotificationsButton";

type RightSideMikroblogProps = {
  userId?: string;
  notifications: NotificationType[];
};

const RightSideMikroblog: React.FC<RightSideMikroblogProps> = ({
  userId,
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
      {Boolean(userId) && (
        <NotificationsButton
          userId={userId!}
          initialNotifications={notifications}
        />
      )}
    </div>
  );
};

export default RightSideMikroblog;
