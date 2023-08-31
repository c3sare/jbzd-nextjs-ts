"use client";

import { BsBellFill } from "@react-icons/all-files/bs/BsBellFill";
import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import Link from "next/link";
import IconButton from "@/app/components/IconButton";
import DropdownContainer from "../../DropdownContainer";

const NotificationsButton = () => {
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  return (
    <div
      className="inline-flex items-center text-left h-full ml-[15px] lg:relative"
      ref={containerRef}
    >
      <IconButton onClick={toggleVisible}>
        <BsBellFill />
      </IconButton>
      {isVisible && (
        <DropdownContainer>
          <ul className="flex flex-col p-0 m-0">
            <li></li>
          </ul>
          <div className="flex flex-nowrap h-[30px] w-full justify-around items-center bg-[#1f1f1f] border-t border-[#313131]">
            <Link
              className="text-[11px] text-[#6e7578] p-0"
              href="/uzytkownik/notyfikacje"
            >
              Zobacz wszystkie
            </Link>
            <button className="text-[11px] text-[#6e7578] p-0">
              Odznacz wszystkie
            </button>
          </div>
        </DropdownContainer>
      )}
    </div>
  );
};

export default NotificationsButton;
