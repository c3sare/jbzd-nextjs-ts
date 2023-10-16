"use client";

import { BsBellFill } from "@react-icons/all-files/bs/BsBellFill";
import useDropdownContainer from "@/hooks/useDropdownContainer";
import Link from "next/link";
import IconButton from "@/app/components/IconButton";
import DropdownContainer from "../../DropdownContainer";
import { useCallback, useEffect, useState } from "react";
import NotificationType from "@/app/(withSidebar)/uzytkownik/notyfikacje/types/NotificationType";
import NotifyElement from "@/app/(withSidebar)/uzytkownik/notyfikacje/components/NotifyElement";
import axios from "axios";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import { pusherClient } from "@/libs/pusher";
import CountBox from "./CountBox";

type NotificationsButonProps = {
  userId: string;
  initialNotifications: NotificationType[];
};

const NotificationsButton: React.FC<NotificationsButonProps> = ({
  userId,
  initialNotifications,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] =
    useState<NotificationType[]>(initialNotifications);
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  useEffect(() => {
    const handleNewNotification = (notify: NotificationType) => {
      setNotifications((prev) => [notify, ...prev]);
    };

    pusherClient.bind("notification:new", handleNewNotification);

    return () => {
      pusherClient.unbind("notification:new");
    };
  }, [userId]);

  const handleSetSeen = useCallback(
    (id: string) => {
      setNotifications((prev) => {
        const newState = [...prev];
        newState.forEach((item) => {
          if (item.id === id) item.seen = true;
        });
        return newState;
      });
    },
    [setNotifications]
  );

  const handleMarkAllAsSeen = () => {
    setIsLoading(true);
    axios
      .post("/api/notifications/seen")
      .then(() => {
        setNotifications((prevState) => {
          const newState = [...prevState];
          newState.forEach((item) => (item.seen = true));
          return newState;
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const notificationsElements = notifications.map((notify) => (
    <NotifyElement
      handleSetSeen={handleSetSeen}
      key={notify.id}
      notification={notify}
    />
  ));

  const unSeenCount = notifications.filter((item) => !item.seen).length;

  return (
    <div
      className="inline-flex items-center text-left h-full ml-[15px] lg:relative"
      ref={containerRef}
    >
      <IconButton onClick={toggleVisible}>
        <BsBellFill />
        <CountBox count={unSeenCount} />
      </IconButton>
      {isVisible && (
        <DropdownContainer>
          <ul className="flex flex-col p-0 m-0 bg-[#181818] w-full">
            {isLoading ? (
              <div className="w-full">
                <BiLoaderAlt className="animate-spin text-[26px] mx-auto" />
              </div>
            ) : (
              notificationsElements
            )}
          </ul>
          <div className="flex flex-nowrap h-[30px] w-full justify-around items-center bg-[#1f1f1f] border-t border-[#313131]">
            <Link
              className="text-[11px] text-[#6e7578] p-0"
              href="/uzytkownik/notyfikacje"
              prefetch={false}
            >
              Zobacz wszystkie
            </Link>
            <button
              className="text-[11px] text-[#6e7578] p-0"
              onClick={handleMarkAllAsSeen}
              disabled={isLoading}
            >
              Odznacz wszystkie
            </button>
          </div>
        </DropdownContainer>
      )}
    </div>
  );
};

export default NotificationsButton;
