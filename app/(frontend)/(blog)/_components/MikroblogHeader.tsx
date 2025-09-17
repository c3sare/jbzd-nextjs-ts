import { HiSpeakerphone } from "@react-icons/all-files/hi/HiSpeakerphone";

import { getSession } from "@/actions/getSession";
import getNotifications from "@/actions/getNotifications";
import Logo from "@/components/header/components/Logo";
import MenuButton from "@/components/header/components/MenuButton";
import MobileMenu from "@/components/header/components/mobilemenu/MobileMenu";
import MikroblogMobileMenu from "./MikroblogMobileMenu";
import RandomPostButton from "@/components/header/components/leftside/components/RandomPostButton";
import MenuButtonDropdown from "@/components/header/components/MenuButtonDropdown";
import Followed from "@/components/header/components/leftside/components/dropdownlists/Followed";
import RightSideMikroblog from "./RightSideMikroblog";

const MikroblogHeader = async () => {
  const session = await getSession();
  const notifications = await getNotifications();

  const id = session?.user?.id;

  const isAuthorized = Boolean(id);

  return (
    <header className="flex justify-center items-center w-full h-[46px] bg-[#181818] fixed left-0 right-0 top-0 z-1000 border-b border-[#252525] md:pr-[15px]">
      <div className="h-full max-w-[1116px] m-auto flex justify-center items-center w-full">
        <div className="flex items-center h-full">
          <Logo />
          <MenuButton
            icon={<HiSpeakerphone className="mr-[5px]" size={20} />}
            href="/mikroblog"
            className="flex border-b border-b-white"
          >
            Mikroblog
          </MenuButton>
        </div>
        <div className="relative flex items-center h-full ml-auto">
          <MenuButton className="hidden md:flex" href="/oczekujace">
            Oczekujące
          </MenuButton>
          {isAuthorized && (
            <MenuButtonDropdown className="w-[220px]" content={<Followed />}>
              Obserwowane
            </MenuButtonDropdown>
          )}
          <RandomPostButton />
          <MenuButton className="hidden md:flex" href="/">
            Działy
          </MenuButton>
        </div>
        <RightSideMikroblog userId={id} notifications={notifications} />
        <MobileMenu>
          <MikroblogMobileMenu />
        </MobileMenu>
      </div>
    </header>
  );
};

export default MikroblogHeader;
