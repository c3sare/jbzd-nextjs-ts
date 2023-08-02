import { getNotifySettings } from "@/app/actions/getNotifySettings";
import NotifySettings from "../components/forms/UserNotifycationsForms/NotifySettings";

const NotificationsPage = async () => {
  const data = await getNotifySettings();

  if (!data) return new Error("Wystąpił błąd!");

  return <NotifySettings data={data} />;
};

export default NotificationsPage;
