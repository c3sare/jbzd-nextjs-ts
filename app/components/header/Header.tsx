import { HiSpeakerphone } from "@react-icons/all-files/hi/HiSpeakerphone";

import Logo from "./components/Logo";
import MenuButton from "./components/MenuButton";
import Search from "./components/search/Search";
import LeftSide from "./components/leftside/LeftSide";
import RightSide from "./components/rightside/RightSide";
import MobileMenu from "./components/mobilemenu/MobileMenu";
import MobileMenuContainer from "./components/mobilemenu/components/MobileMenuContainer";
import { getSession } from "@/app/actions/getSession";
import getNotifications from "@/app/actions/getNotifications";
import getLastMessages from "@/app/actions/getLastMessages";

const Header = async () => {
  const session = await getSession();
  const notifications = await getNotifications();
  const messages = await getLastMessages();

  const userId = session?.user?.id;

  return (
    <header className="flex justify-center items-center w-full h-[46px] bg-[#181818] fixed left-0 right-0 top-0 z-[1000] border-b border-[#252525]">
      <div className="h-full max-w-[1116px] m-auto flex justify-center items-center w-full">
        <div className="flex items-center h-full">
          <Logo />
          <MenuButton
            icon={<HiSpeakerphone className="mr-[5px]" size={20} />}
            href="/mikroblog"
            className="lg:flex"
          >
            Mikroblog
          </MenuButton>
          <Search />
        </div>
        <LeftSide />
        <RightSide
          userId={userId}
          notifications={notifications}
          messages={messages}
        />
        <MobileMenu>
          <MobileMenuContainer />
        </MobileMenu>
      </div>
    </header>
  );
};

export default Header;
