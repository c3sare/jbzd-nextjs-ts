import getNotifySettings from "@/app/actions/getNotifySettings";
import NotifySettings from "../components/forms/UserNotifycationsForms/NotifySettings";

export const revalidate = 0;

const NotificationsPage = async () => {
  const data = await getNotifySettings();

  return <NotifySettings data={data} />;
};

export default NotificationsPage;
