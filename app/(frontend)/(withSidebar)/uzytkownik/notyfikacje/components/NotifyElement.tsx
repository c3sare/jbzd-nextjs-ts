"use client";

import Image from "next/image";
import Link from "next/link";
import NotificationType from "../types/NotificationType";
import { format, parseISO } from "date-fns";
import clsx from "clsx";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BadgeElementProps = {
  notification: NotificationType;
  handleSetSeen?: (id: string) => void;
};

const NotifyElement: React.FC<BadgeElementProps> = ({
  notification,
  handleSetSeen,
}) => {
  const router = useRouter();
  const [seen, setSeen] = useState<boolean>(notification.seen);
  const image =
    notification.post.memContainers.find((mem) => mem.type === "IMAGE")?.data ||
    "/images/avatars/default.jpg";

  const msg = {
    BADGE: "Zostałeś odznaczony",
    NEW_COMMENT: "Umieszczono nowy komentarz",
    COMMENT_PIN: "Zostałeś wspomniany",
  };

  const handleUnSeenNotify = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!notification.seen) {
      e.preventDefault();
      axios
        .post(`/api/notifications/seen/${notification.id}`)
        .then((res) => {
          setSeen(res.data.seen);
          if (handleSetSeen) handleSetSeen(notification.id);
          router.push(href);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isISODate = typeof notification.addTime === "string";

  const date = isISODate
    ? parseISO(notification.addTime as unknown as string)
    : notification.addTime;

  const formatedDateTime = format(date, "yyyy-MM-dd HH:mm:ss");

  const href = `/obr/${notification.post.id}/${notification.post.slug}${
    notification.commentId ? "#" + notification.commentId : ""
  }`;

  return (
    <li
      className={clsx(
        "p-[7px_5px] border-b bg-[#313131] border-b-[#1f1f1f]",
        seen && "opacity-30"
      )}
    >
      <Link
        href={href}
        onClick={(e) => handleUnSeenNotify(e, href)}
        className="block border-none text-[14px] p-[5px_10px] text-white relative after:block clear-both content-['']"
      >
        <Image
          src={image}
          width={30}
          height={30}
          alt={notification.post.title}
          className="float-left mr-[10px]"
        />
        <div>
          <span>
            {msg[notification.type]} przez {notification.author.username}
          </span>
          <br />
          <small>{formatedDateTime}</small>
        </div>
      </Link>
    </li>
  );
};
export default NotifyElement;
