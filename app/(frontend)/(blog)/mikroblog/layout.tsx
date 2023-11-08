import type { PropsWithChildren } from "react";

import { getSession } from "@/actions/getSession";

import Sidebar from "./_components/layout/sidebar/authorized/Sidebar";
import NoAuthSidebar from "./_components/layout/sidebar/unauthorized/NoAuthSidebar";
import ScrollTopButton from "./_components/layout/ScrollTopButton";
import SidebarFooter from "./_components/layout/sidebar/SidebarFooter";
import LightBox from "./_components/LightBox";

const MikroblogLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();

  const isAuthorized = Boolean(session?.user?.id);

  return (
    <LightBox>
      <div className="max-w-[1110px] mx-auto px-[15px] mt-[45px] pt-2 min-h-[calc(100vh_-_97px)]">
        <div className="mx-[-15px]">
          <div className="hidden md:block float-right w-1/3 relative min-h-[1px] px-[15px]">
            <div>
              {isAuthorized ? <Sidebar /> : <NoAuthSidebar />}
              <SidebarFooter />
            </div>
          </div>
          {children}
        </div>
      </div>
      <ScrollTopButton />
    </LightBox>
  );
};

export default MikroblogLayout;
