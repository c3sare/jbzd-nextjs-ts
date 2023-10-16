import getUserNotifications from "@/actions/notifications/getUserNotifications";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import NotifyElement from "./components/NotifyElement";

const NotificationsPage = async () => {
  const notifis = await getUserNotifications();

  return (
    <>
      <Breadcrumb currentNode="Notyfikacje">
        <Link href="/">Strona główna</Link>
      </Breadcrumb>
      <div className="md:ml-[45px]">
        <ul>
          {notifis.map((notify) => (
            <NotifyElement key={notify.id} notification={notify} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default NotificationsPage;
