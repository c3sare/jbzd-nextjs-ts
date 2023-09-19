"use client";

import { BsBellFill } from "@react-icons/all-files/bs/BsBellFill";
import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import Link from "next/link";
import IconButton from "@/app/components/IconButton";
import DropdownContainer from "../../DropdownContainer";
import { useCallback, useEffect, useState } from "react";
import NotificationType from "@/app/(withSidebar)/uzytkownik/notyfikacje/types/NotificationType";
import NotifyElement from "@/app/(withSidebar)/uzytkownik/notyfikacje/components/NotifyElement";
import axios from "axios";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import { useRouter } from "next/navigation";

const NotificationsButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  useEffect(() => {
    const controller = new AbortController();

    if (isVisible && notifications.length === 0) {
      setIsLoading(true);
      axios
        .get("/api/notifications", { signal: controller.signal })
        .then((res) => {
          const { data } = res;
          setNotifications(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }

    return () => controller.abort();
  }, [isVisible, notifications]);

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
        router.refresh();
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

  return (
    <div
      className="inline-flex items-center text-left h-full ml-[15px] lg:relative"
      ref={containerRef}
    >
      <IconButton onClick={toggleVisible}>
        <BsBellFill />
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
