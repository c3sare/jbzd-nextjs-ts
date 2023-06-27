import Logo from "./components/Logo";
import MenuButton from "./components/MenuButton";

import { HiSpeakerphone } from "react-icons/hi";
import MenuButtonDropdown from "./components/MenuButtonDropdown";
import Followed from "./components/dropdownlists/Followed";
import Categories from "./components/dropdownlists/Categories";
import IconButton from "./components/IconButton";
import { BsBellFill, BsFillEnvelopeFill } from "react-icons/bs";
import CoinsBox from "./components/CoinsBox";
import Search from "./components/search/Search";

const Header = () => {
  return (
    <header className="flex justify-center items-center w-full h-[46px] bg-[#181818] fixed left-0 right-0 top-0 z-[1000] border-b border-[#252525]">
      <div className="h-full max-w-[1116px] m-auto flex justify-center items-center w-full">
        <div className="flex items-center h-full">
          <Logo />
          <MenuButton icon={<HiSpeakerphone size={20} />} href="/mikroblog">
            Mikroblog
          </MenuButton>
          <Search />
        </div>
        <div className="flex items-center relative ml-auto h-full">
          <MenuButton href="/oczekujace">Oczekujące</MenuButton>
          <MenuButtonDropdown className="w-[220px]" content={<Followed />}>
            Obserwowane
          </MenuButtonDropdown>
          <MenuButton href="/losowe">Losowe</MenuButton>
          <MenuButtonDropdown
            content={<Categories />}
            className="w-[520px] gap-x-[1px]"
          >
            Działy
          </MenuButtonDropdown>
        </div>
        <div className="flex items-center text-right justify-end">
          <CoinsBox />
          <IconButton>
            <BsFillEnvelopeFill />
          </IconButton>
          <IconButton>
            <BsBellFill />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
