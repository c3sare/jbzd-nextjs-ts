"use client";

import { BsFillEnvelopeFill } from "react-icons/bs";
import IconButton from "../../IconButton";
import useDropdownContainer from "@/app/hooks/useDropdownContainer";
import DropdownContainer from "./DropdownContainer";
import Link from "next/link";

const MessagesButton = () => {
  const { isVisible, toggleVisible, containerRef } = useDropdownContainer();

  return (
    <div
      className="inline-flex items-center text-left ml-[15px] h-full lg:relative"
      ref={containerRef}
    >
      <IconButton onClick={toggleVisible}>
        <BsFillEnvelopeFill />
      </IconButton>
      {isVisible && (
        <DropdownContainer>
          <div className="flex flex-nowrap h-[30px] w-full justify-center items-center bg-[#1f1f1f] border-t border-[#313131]">
            <Link
              className="text-[11px] text-[#6e7578] p-0"
              href="/wiadomosci-prywatne"
            >
              Zobacz wszystkie
            </Link>
          </div>
        </DropdownContainer>
      )}
    </div>
  );
};

export default MessagesButton;
