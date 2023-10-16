import { HiSpeakerphone } from "@react-icons/all-files/hi/HiSpeakerphone";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { IoSettingsSharp } from "@react-icons/all-files/io5/IoSettingsSharp";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { RiFileListFill } from "@react-icons/all-files/ri/RiFileListFill";
import { GiPerspectiveDiceSixFacesFour } from "@react-icons/all-files/gi/GiPerspectiveDiceSixFacesFour";
import { BsFillStarFill } from "@react-icons/all-files/bs/BsFillStarFill";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";

import MobileMenuLinkButton from "./MobileMenuLinkButton";
import Categories from "../../leftside/components/dropdownlists/Categories";
import ProfileInfo from "./ProfileInfo";
import SidebarForms from "@/app/components/sidebar/components/SidebarForms";
import { getSession } from "@/actions/getSession";
import MobileMenuRandomPostButton from "./MobileMenuRandomPostButton";

const MobileMenuContainer = async () => {
  const session = await getSession();

  const isLoggedIn = Boolean(session?.user?.email);

  return (
    <div className="lg:hidden fixed top-[46px] left-0 w-full h-[calc(100vh-46px)] bg-[#313131] pt-0 overflow-y-auto">
      <div className="pb-[5px]">
        {isLoggedIn ? <ProfileInfo /> : <SidebarForms />}
      </div>
      <div className="flex m-[0_auto] p-[5px] flex-wrap">
        <MobileMenuLinkButton href="/mikroblog" icon={HiSpeakerphone}>
          Mikroblog
        </MobileMenuLinkButton>
        <MobileMenuLinkButton href="/wyszukaj/wszystko" icon={FaSearch}>
          Szukaj
        </MobileMenuLinkButton>
        <MobileMenuLinkButton href="/oczekujace" icon={AiOutlineClockCircle}>
          Oczekujące
        </MobileMenuLinkButton>
        <MobileMenuLinkButton
          href="/ulubione"
          icon={BsFillStarFill}
          disabled={!isLoggedIn}
        >
          Ulubione
        </MobileMenuLinkButton>
        <MobileMenuRandomPostButton />
        <MobileMenuLinkButton
          href="/obserwowane/dzialy"
          icon={RiFileListFill}
          disabled={!isLoggedIn}
        >
          Działy
        </MobileMenuLinkButton>
        <MobileMenuLinkButton
          href="/obserwowane/uzytkownicy"
          icon={BiUser}
          disabled={!isLoggedIn}
        >
          Użytkownicy
        </MobileMenuLinkButton>
        <MobileMenuLinkButton
          href="/uzytkownik/ustawienia"
          icon={IoSettingsSharp}
          disabled={!isLoggedIn}
        >
          Ustawienia
        </MobileMenuLinkButton>
      </div>
      <div className="bg-[#181818] flex flex-wrap">
        <Categories />
      </div>
    </div>
  );
};

export default MobileMenuContainer;
