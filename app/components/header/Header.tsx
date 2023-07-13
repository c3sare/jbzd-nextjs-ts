import { HiSpeakerphone } from "react-icons/hi";

import Logo from "./components/Logo";
import MenuButton from "./components/MenuButton";
import Search from "./components/search/Search";
import MobileMenu from "./components/mobilemenu/MobileMenu";
import RightSide from "./components/rightside/RightSide";
import LeftSide from "./components/leftside/LeftSide";
import getSession from "@/app/actions/getSession";
import getCategories from "@/app/actions/getCategories";
import getIn2DArray from "@/app/libs/getIn2DArray";
import MobileMenuContainer from "./components/mobilemenu/components/MobileMenuContainer";

const Header = async () => {
  const session = await getSession();
  const categories = await getCategories();

  const categoriesInColumns = getIn2DArray(categories);

  const isLoggedIn = Boolean(session?.user?.email);

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
        <LeftSide categories={categoriesInColumns} isLoggedIn={isLoggedIn} />
        <RightSide />
        <MobileMenu>
          <MobileMenuContainer
            isLoggedIn={isLoggedIn}
            categories={categoriesInColumns}
          />
        </MobileMenu>
      </div>
    </header>
  );
};

export default Header;
