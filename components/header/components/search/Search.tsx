"use client";

import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import MenuButton from "../MenuButton";
import { useCallback, useEffect, useState } from "react";
import Form from "./components/Form";
import { usePathname } from "next/navigation";

const Search = () => {
  const pathname = usePathname();
  const isSearchPage = pathname.indexOf("/wyszukaj/") > -1;
  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

  const handleToggleSearchBar = useCallback(() => {
    if (!isSearchPage) {
      setIsOpenSearchBar(!isOpenSearchBar);
    }
  }, [isOpenSearchBar, isSearchPage]);

  useEffect(() => {
    if (isSearchPage && isOpenSearchBar) setIsOpenSearchBar(false);
  }, [isSearchPage, isOpenSearchBar]);

  return (
    <>
      <MenuButton
        icon={<BiSearch className="mr-[5px]" size={20} />}
        active={isSearchPage}
        className="md:flex"
        onClick={handleToggleSearchBar}
      >
        Szukaj
      </MenuButton>
      {isOpenSearchBar && !isSearchPage && (
        <div className="hidden md:flex absolute top-[100%] left-0 w-full h-[120px] bg-[#1f1f1f]">
          <Form />
        </div>
      )}
    </>
  );
};

export default Search;
