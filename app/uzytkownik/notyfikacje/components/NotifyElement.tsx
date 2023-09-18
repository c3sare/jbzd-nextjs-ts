import Image from "next/image";
import Link from "next/link";
import NotificationType from "../types/NotificationType";
import { format } from "date-fns";
import clsx from "clsx";

type BadgeElementProps = {
  notification: NotificationType;
};

const NotifyElement: React.FC<BadgeElementProps> = ({ notification }) => {
  const image =
    notification.post.memContainers.find((mem) => mem.type === "IMAGE")?.data ||
    "/images/avatars/default.jpg";

  const msg = {
    BADGE: "Zostałeś odznaczony",
    NEW_COMMENT: "Umieszczono nowy komentarz",
    COMMENT_PIN: "Zostałeś wspomniany",
  };

  return (
    <li className={clsx("p-[7px_5px] border-b border-b-[#1f1f1f] opacity-30")}>
      <Link
        href={`/obr/${notification.post.id}/${notification.post.slug}${
          notification.commentId ? "#" + notification.commentId : ""
        }`}
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
          <small>{format(notification.addTime, "yyyy-MM-dd HH:mm:ss")}</small>
        </div>
      </Link>
    </li>
  );
};
export default NotifyElement;
