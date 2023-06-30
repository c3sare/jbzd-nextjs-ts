"use client";

import { useSession } from "next-auth/react";
import CoinsBox from "./components/CoinsBox";
import MessagesButton from "./components/MessagesButton";
import NotificationsButton from "./components/NotificationsButton";

const RightSide: React.FC<React.PropsWithChildren> = () => {
  const session = useSession();

  const isLoggedIn = session?.status === "authenticated";

  return (
    <div className="flex items-center text-right justify-end h-full">
      <CoinsBox />
      {isLoggedIn && (
        <>
          <MessagesButton />
          <NotificationsButton />
        </>
      )}
    </div>
  );
};

export default RightSide;
