import Image from "next/image";
import Link from "next/link";
import rankBg from "@/public/images/ranks.png";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";

import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";
import { FaReply } from "@react-icons/all-files/fa/FaReply";

const BlogPost = () => {
  return (
    <div className="relative mb-[25px]">
      <div className="min-w-[50px] mr-[20px] float-left relative">
        <Link
          className="w-[50px] h-[50px] float-left rounded-full overflow-hidden relative text-[#c23d3a]"
          href="/mikroblog/uzytkownik/c3sare"
        >
          <Image
            alt="Avatar"
            src="/images/avatars/default.jpg"
            width={50}
            height={50}
          />
        </Link>
        <span
          className="absolute right-[-5px] bottom-[-15px] z-[8] inline-block w-[28px] h-[28px] rounded-full float-left group"
          style={{
            backgroundPosition: "-84px 0",
            background: `url(${rankBg.src}) no-repeat 0 0`,
          }}
        >
          <span className="absolute hidden p-0.5 -translate-x-1/2 bg-black bottom-full left-1/2 text-[9px] text-center min-w-[75px] group-hover:block">
            Banan
          </span>
        </span>
      </div>
      <div className="float-left w-[calc(100%_-_70px)] relative">
        <div className="bg-[#1f1f1f] p-[13px_7px_13px_15px] leading-[24px]">
          <Link
            className="min-w-[50px] mr-[20px] relative text-[18px] font-semibold text-white"
            href="/mikroblog/uzytkownik/c3sare"
          >
            c3sare
          </Link>
          <time className="text-[12px] font-semibold text-[#6e7578] relative bottom-[-2px]">
            <Link href="/mikroblog/uzytkownik/c3sare">10 min. temu</Link>
          </time>
          <div className="flex items-center justify-center float-right">
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
        <div className="clear-both relative p-[15px_15px_25px] bg-[#313131]">
          <div>
            <div>
              <span>
                <p className="break-words text-[13px] text-white mb-[10px] leading-[17px]">
                  <span>
                    <span>
                      {" "}
                      Ej, w sumie, dlaczego to one nie są sprzedawane na wynos w
                      podobny sposób jak kebaby, burrito, czy inne potrawy na
                      bazie tortilli?
                      <br />
                      No niby tortilla a naleśnik, nie to samo, ale w tym
                      przypadku to dość podobna rzecz. <br />
                      Przecież to nie taki zły pomysł, farsz może być z wielu
                      rzeczy, oprócz mięsa, kapusty i grzybów, to przecież nie
                      raz się widzi, jak zamiast tego wpieprzają tam jakiś
                      szpinak, albo jajka i cholera wie co jeszcze, to już
                      szeroka lista do menu. <br />
                      Jakąś budkę w zatłoczonym miejscu otworzyć to myślę, że by
                      się spokojnie sprzedawało, z odpowiednim marketingiem.{" "}
                    </span>
                    <span className="max-w-[300px] my-[10px] block">
                      <Image
                        src="/images/blog/1.jpg"
                        alt="Blog post image"
                        width={300}
                        height={225}
                      />
                    </span>
                  </span>
                </p>
              </span>
            </div>
          </div>
          <ul className="absolute bottom-0 left-[15px] transition-opacity ease-in-out duration-200">
            <li className="float-left leading-[20px] mr-[15px]">
              <button className="text-[12px] text-[#c23d3a] flex items-center justify-center gap-2">
                <FaReply /> Odpowiedz
              </button>
            </li>
          </ul>
        </div>
        <div className="pt-[20px] bg-[#313131]"></div>
      </div>
    </div>
  );
};

export default BlogPost;
