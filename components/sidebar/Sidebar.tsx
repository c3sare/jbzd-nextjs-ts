import SidebarForms from "./components/SidebarForms";
import ProfileInfo from "./components/ProfileInfo";
import { getSession } from "@/actions/getSession";

const Sidebar = async () => {
  const session = await getSession();
  const isLoggedIn = session?.user?.email;

  return (
    <aside
      id="sidebar"
      className="hidden xl:flex flex-col w-[356px] bg-[#313131]"
    >
      {isLoggedIn ? <ProfileInfo /> : <SidebarForms />}
    </aside>
  );
};

export default Sidebar;
