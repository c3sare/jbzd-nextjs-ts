"use client";

import IconButton from "@/app/components/IconButton";
import MobileMenuContainer from "./components/MobileMenuContainer";
import { useCallback, useState } from "react";

const MobileMenu = () => {
  const [isShowedMobileMenu, setIsShowedMobileMenu] = useState<boolean>(false);

  const toggleMenuVisibility = useCallback(
    () => setIsShowedMobileMenu(!isShowedMobileMenu),
    [isShowedMobileMenu]
  );

  return (
    <>
      <IconButton className="mx-5 lg:hidden" onClick={toggleMenuVisibility}>
        <div className="relative w-[30px] h-[22px]">
          <span className="w-full h-[2px] my-[4px] block bg-white" />
          <span className="w-full h-[2px] my-[4px] block bg-white" />
          <span className="w-full h-[2px] my-[4px] block bg-white" />
        </div>
      </IconButton>
      <MobileMenuContainer isVisible={isShowedMobileMenu} />
    </>
  );
};

export default MobileMenu;
