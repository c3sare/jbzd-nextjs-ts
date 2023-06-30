"use client";

import { useSession } from "next-auth/react";
import SidebarForms from "./components/SidebarForms";

const Sidebar = () => {
  const session = useSession();

  console.log(session);

  return (
    <aside className="hidden xl:flex flex-col w-[356px] bg-[#313131]">
      <SidebarForms />
    </aside>
  );
};

export default Sidebar;
