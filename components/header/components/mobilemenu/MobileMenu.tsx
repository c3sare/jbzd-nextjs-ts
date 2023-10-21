"use client";

import IconButton from "@/components/IconButton";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MobileMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const [isShowedMobileMenu, setIsShowedMobileMenu] = useState<boolean>(false);

  const toggleMenuVisibility = useCallback(
    () => setIsShowedMobileMenu(!isShowedMobileMenu),
    [isShowedMobileMenu]
  );

  useEffect(() => {
    if (isShowedMobileMenu) setIsShowedMobileMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton className="mx-5 md:hidden" onClick={toggleMenuVisibility}>
        <div className="relative w-[30px] h-[22px]">
          <span className="w-full h-[2px] my-[4px] block bg-white" />
          <span className="w-full h-[2px] my-[4px] block bg-white" />
          <span className="w-full h-[2px] my-[4px] block bg-white" />
        </div>
      </IconButton>
      {isShowedMobileMenu && children}
    </>
  );
};

export default MobileMenu;
