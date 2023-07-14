import { HiSpeakerphone } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { RiFileListFill } from "react-icons/ri";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";

import MobileMenuLinkButton from "./MobileMenuLinkButton";
import Categories from "../../leftside/components/dropdownlists/Categories";
import ProfileInfo from "./ProfileInfo";
import SidebarForms from "@/app/components/sidebar/components/SidebarForms";
import getSession from "@/app/actions/getSession";

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
        <MobileMenuLinkButton
          href="/losowe"
          icon={GiPerspectiveDiceSixFacesFour}
        >
          Losowe
        </MobileMenuLinkButton>
        <MobileMenuLinkButton
          href="/obserwowane/dzialy"
          icon={RiFileListFill}
          disabled={!isLoggedIn}
        >
          Działy
        </MobileMenuLinkButton>
        <MobileMenuLinkButton
          href="/obserwowane/uzytkownicy"
          icon={BiSolidUser}
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
