"use client";

import { BiSearch } from "react-icons/bi";
import MenuButton from "../MenuButton";
import { useCallback, useState } from "react";
import Form from "./components/Form";

const Search = () => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

  const handleToggleSearchBar = useCallback(
    () => setIsOpenSearchBar(!isOpenSearchBar),
    [isOpenSearchBar]
  );

  return (
    <>
      <MenuButton icon={<BiSearch size={20} />} onClick={handleToggleSearchBar}>
        Szukaj
      </MenuButton>
      {isOpenSearchBar && (
        <div className="absolute top-[100%] left-0 w-full h-[120px] bg-[#1f1f1f]">
          <Form closeForm={() => setIsOpenSearchBar(false)} />
        </div>
      )}
    </>
  );
};

export default Search;
