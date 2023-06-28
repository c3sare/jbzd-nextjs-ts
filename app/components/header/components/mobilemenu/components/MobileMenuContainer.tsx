"use client";

import { HiSpeakerphone } from "react-icons/hi";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { RiFileListFill } from "react-icons/ri";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";

import Link from "next/link";

import Avatar from "@/app/components/Avatar";
import IconButton from "@/app/components/IconButton";
import MobileMenuLinkButton from "./MobileMenuLinkButton";
import Categories from "../../dropdownlists/Categories";

type MobileMenuContainerProps = {
  isVisible: boolean;
};

const MobileMenuContainer: React.FC<MobileMenuContainerProps> = ({
  isVisible,
}) => {
  return (
    isVisible && (
      <div className="lg:hidden fixed top-[46px] left-0 w-full h-[calc(100vh-46px)] bg-[#313131] pt-0 overflow-y-auto">
        <div className="pb-[5px]">
          <div className="flex flex-wrap m-[0_auto] p-[10px_15px] items-center text-white">
            <Link
              href="/uzytkownik/c3sare"
              className="flex gap-1 items-center mr-[5px]"
            >
              <Avatar src="/images/avatars/default.jpg" size={30} />
              <span className="font-bold ml-[5px] text-[16px]">c3sare</span>
            </Link>
            <IconButton className="ml-[5px]">
              <FaPowerOff color="#888888" />
            </IconButton>
          </div>
        </div>
        <div className="flex m-[0_auto] p-[5px] flex-wrap">
          <MobileMenuLinkButton href="/" icon={HiSpeakerphone}>
            Mikroblog
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={FaSearch}>
            Szukaj
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={AiOutlineClockCircle}>
            Oczekujące
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={BsFillStarFill}>
            Ulubione
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={GiPerspectiveDiceSixFacesFour}>
            Losowe
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={RiFileListFill}>
            Działy
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={BiSolidUser}>
            Użytkownicy
          </MobileMenuLinkButton>
          <MobileMenuLinkButton href="/" icon={IoSettingsSharp}>
            Ustawienia
          </MobileMenuLinkButton>
        </div>
        <div className="bg-[#181818] flex flex-wrap">
          <Categories />
        </div>
      </div>
    )
  );
};

export default MobileMenuContainer;
