import type { PropsWithChildren } from "react";

import { getSession } from "@/actions/getSession";

import QuestionnaireProvider from "./_context/QuestionnaireProvider";
import Sidebar from "./_components/layout/sidebar/Sidebar";
import NoAuthSidebar from "./_components/layout/sidebar/NoAuthSidebar";
import ScrollTopButton from "./_components/layout/ScrollTopButton";

const MikroblogLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();

  const isAuthorized = Boolean(session?.user?.id);

  return (
    <QuestionnaireProvider>
      <div className="max-w-[1110px] mx-auto px-[15px] mt-[45px] min-h-[calc(100vh_-_97px)]">
        <div className="mx-[-15px]">
          <div className="hidden md:block float-right w-1/3 relative min-h-[1px] px-[15px]">
            <div>
              {isAuthorized ? <Sidebar /> : <NoAuthSidebar />}
              <ul className="mb-4 text-center">
                <li>
                  <button className="text-[#6e7578] bg-transparent">
                    Regulamin
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {children}
        </div>
      </div>
      <ScrollTopButton />
    </QuestionnaireProvider>
  );
};

export default MikroblogLayout;
