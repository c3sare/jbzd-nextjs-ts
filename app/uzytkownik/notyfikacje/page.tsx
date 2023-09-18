import getUserNotifications from "@/app/actions/notifications/getUserNotifications";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import NotifyElement from "./components/NotifyElement";

const NotificationsPage = async () => {
  const notifis = await getUserNotifications();
  console.log(notifis);

  return (
    <>
      <Breadcrumb currentNode="Notyfikacje">
        <Link href="/">Strona główna</Link>
      </Breadcrumb>
      <div>
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
