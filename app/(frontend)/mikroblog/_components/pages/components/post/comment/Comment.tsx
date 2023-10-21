import { BiMinus } from "@react-icons/all-files/bi/BiMinus";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import ActionButton from "../ActionButton";
import { IoMdWarning } from "@react-icons/all-files/io/IoMdWarning";
import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";
import Link from "next/link";
import Image from "next/image";

import rankImg from "@/public/images/ranks.png";
import { useState } from "react";

const Comment = () => {
  const [expandedOptions, setExpandedOptions] = useState<boolean>(false);

  return (
    <li className="group w-full">
      <div className="border-t border-t-[hsla(198,_4%,_45%,.5)] flex">
        <div className="w-[30px] mt-[17px] h-[30px] mr-[15px] relative float-left min-w-auto">
          <Link href="/mikroblog/uzytkownik/c3sare">
            <Image
              src="/images/avatars/default.jpg"
              alt="Avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
          <span
            className="w-[28px] h-[28px] scale-[.7] bottom-[-10px] right-[-10px] absolute z-[8] rounded-full group/avatar"
            style={{
              background: `url(${rankImg.src}) no-repeat`,
              backgroundPosition: "-84px 0",
            }}
          >
            <span className="hidden absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white px-[15px] py-0.5 text-[12px] group-hover/avatar:block">
              Banan
            </span>
          </span>
        </div>
        <div className="w-[calc(100%_-_45px)] relative flex flex-col">
          <div className="p-[10px_0_7px] relative leading-[24px] flex w-full">
            <Link
              className="w-auto text-[12px] font-semibold text-white mr-[15px] float-left"
              href="/mikroblog/uzytkownik/c3sare"
            >
              c3sare
            </Link>
            <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
              12g temu
            </time>
            <div className="ml-auto flex items-center justify-end">
              <div className="mr-[7px] text-[#6e7578] text-[20px] cursor-pointer ml-0.5">
                <FaQuestionCircle />
              </div>
              <p className="mr-2 text-[14px] font-semibold text-[#6e7578] leading-[24px] mb-0 ml-0.5">
                0
              </p>
              <button className="w-[24px] h-[24px] bg-[#6e7578] p-0 leading-[24px] ml-[2px] inline-block text-center text-[11px] font-semibold transition-all duration-200 ease-in-out">
                <BiPlus size={24} />
              </button>
              <button className="w-[24px] h-[24px] bg-[#6e7578] p-0 leading-[24px] ml-[2px] inline-block text-center text-[11px] font-semibold transition-all duration-200 ease-in-out">
                <BiMinus size={24} />
              </button>
            </div>
          </div>
          <div className="p-[0_0_35px] text-left clear-both relative bg-[#313131]">
            <span className="overflow-hidden">
              <p className="break-words text-[13px] text-[#ddd] mb-[10px] leading-[17px]">
                <span className="overflow-hidden">
                  <span className="block">
                    Wino to nie kohol. Wino to dzieci w starożytnym Rzymie piły
                    przed szkołą na śniadanie.
                  </span>
                </span>
              </p>
            </span>
            <ul className="transition-opacity sm:opacity-0 ease-in-out duration-200 group-hover:opacity-100">
              <li className="float-left leading-[20px] mr-[15px]">
                <ActionButton icon={FaReply}>Odpowiedz</ActionButton>
              </li>
              <li className="float-left leading-[20px] mr-[15px]">
                <ActionButton icon={IoMdWarning}>Zgłoś</ActionButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Comment;
