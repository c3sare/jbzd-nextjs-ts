import type { PropsWithChildren } from "react";

import { getSession } from "@/actions/getSession";

import QuestionnaireProvider from "./_context/QuestionnaireProvider";
import Sidebar from "./_components/layout/sidebar/Sidebar";
import NoAuthSidebar from "./_components/layout/sidebar/NoAuthSidebar";
import ScrollTopButton from "./_components/layout/ScrollTopButton";
import TermsProvider from "./_context/TermsProvider";
import SidebarFooter from "./_components/layout/sidebar/SidebarFooter";

const MikroblogLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();

  const isAuthorized = Boolean(session?.user?.id);

  return (
    <TermsProvider>
      <QuestionnaireProvider>
        <div className="max-w-[1110px] mx-auto px-[15px] mt-[45px] min-h-[calc(100vh_-_97px)]">
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
      </QuestionnaireProvider>
    </TermsProvider>
  );
};

export default MikroblogLayout;
