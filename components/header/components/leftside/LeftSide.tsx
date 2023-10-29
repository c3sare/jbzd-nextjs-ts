import { getSession } from "@/actions/getSession";
import MenuButton from "../MenuButton";
import MenuButtonDropdown from "../MenuButtonDropdown";
import Categories from "./components/dropdownlists/Categories";
import Followed from "./components/dropdownlists/Followed";
import RandomPostButton from "./components/RandomPostButton";

const LeftSide = async () => {
  const session = await getSession();
  const isLoggedIn = Boolean(session?.user);

  return (
    <div className="relative flex items-center h-full ml-auto">
      <MenuButton className="hidden md:flex" href="/oczekujace">
        Oczekujące
      </MenuButton>
      {isLoggedIn && (
        <MenuButtonDropdown className="w-[220px]" content={<Followed />}>
          Obserwowane
        </MenuButtonDropdown>
      )}
      <RandomPostButton />
      <MenuButtonDropdown
        content={<Categories />}
        className="w-[520px] gap-x-[1px]"
      >
        Działy
      </MenuButtonDropdown>
    </div>
  );
};

export default LeftSide;
