import MenuButton from "../MenuButton";
import MenuButtonDropdown from "../MenuButtonDropdown";
import Categories from "./components/dropdownlists/Categories";
import Followed from "./components/dropdownlists/Followed";
import { CategoryWithChildren } from "@/app/libs/getIn2DArray";

type LeftSideProps = {
  isLoggedIn: boolean;
  categories: CategoryWithChildren[][];
};

const LeftSide: React.FC<LeftSideProps> = ({ isLoggedIn, categories }) => {
  return (
    <div className="flex items-center relative ml-auto h-full">
      <MenuButton className="lg:flex" href="/oczekujace">
        Oczekujące
      </MenuButton>
      {isLoggedIn && (
        <MenuButtonDropdown className="w-[220px]" content={<Followed />}>
          Obserwowane
        </MenuButtonDropdown>
      )}
      <MenuButton href="/losowe" className="lg:flex">
        Losowe
      </MenuButton>
      <MenuButtonDropdown
        content={<Categories categories={categories} />}
        className="w-[520px] gap-x-[1px]"
      >
        Działy
      </MenuButtonDropdown>
    </div>
  );
};

export default LeftSide;
