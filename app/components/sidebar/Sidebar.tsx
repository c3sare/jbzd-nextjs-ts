"use client";

import { useSession } from "next-auth/react";
import SidebarForms from "./components/SidebarForms";
import ProfileInfo from "./components/ProfileInfo";

const Sidebar = () => {
  const session = useSession();
  const isLoading = session.status === "loading";
  const isLoggedIn = session.status === "authenticated";

  return (
    <aside className="hidden xl:flex flex-col w-[356px] bg-[#313131]">
      {isLoading ? (
        <span>Loading...</span>
      ) : isLoggedIn ? (
        <ProfileInfo />
      ) : (
        <SidebarForms />
      )}
    </aside>
  );
};

export default Sidebar;
