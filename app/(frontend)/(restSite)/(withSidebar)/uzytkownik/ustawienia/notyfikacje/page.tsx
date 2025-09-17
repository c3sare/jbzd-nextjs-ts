import { getNotifySettings } from "@/actions/getNotifySettings";
import NotifySettings from "./components/NotifySettings";

const NotificationsPage = async () => {
  const data = await getNotifySettings();

  if (!data) return null;

  return <NotifySettings data={data} />;
};

export default NotificationsPage;
