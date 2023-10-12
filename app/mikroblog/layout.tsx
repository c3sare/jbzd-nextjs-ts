import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

const MikroblogLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-[1110px] mx-auto px-[15px] mt-[45px]">
      <div className="mx-[-15px]">
        <div className="float-right w-1/3 relative min-h-[1px] px-[15px]">
          <div>
            <div className="mt-[108px] relative bg-[#313131] pb-[24px]">
              <div className="absolute top-[-84px] w-full">
                <div className="pt-[25px]">
                  <span className="float-left w-[100px] h-[100px] border-[5px] border-[#252525] mr-[5px] mt-[-25px] rounded-full overflow-hidden relative">
                    <Image
                      className="h-auto max-w-full"
                      width={90}
                      height={90}
                      alt="Avatar"
                      src="/images/avatars/default.jpg"
                    />
                  </span>
                  <span className="w-[28px] h-[28px] float-left inline-block rounded-full bg-[url(/images/ranks.png)] bg-no-repeat overflow-hidden" />
                  <h2 className="text-[18px] font-semibold text-white float-left ml-2 max-w-[165px] overflow-hidden">
                    c3sare
                  </h2>
                  <div className="w-[calc(100%_-_105px)] mt-[4px] float-left">
                    <Link
                      className="mr-[20px] text-[12px] text-[#b3d734]"
                      href="/uzytkownik/c3sare"
                    >
                      Mój profil
                    </Link>
                    <Link
                      className="mr-[20px] text-[12px] text-[#b3d734]"
                      href="/uzytkownik/ustawienia"
                    >
                      Ustawienia
                    </Link>
                    <Link
                      className="mr-[20px] text-[12px] text-[#b3d734]"
                      href="/mikroblog/ulubione"
                    >
                      Ulubione
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-[#313131]"></div>
              <div className="bg-[#313131]">
                <div className="p-[15px_15px_10px] w-full float-left bg-[#313131]">
                  <h4 className="text-[11px] font-bold text-[#6e7578] m-[0_0_8px]">
                    Polecane tagi:
                  </h4>
                  <ul className="mb-[5px]">
                    <li className="float-left text-[11px] mr-[15px]">
                      <Link
                        className="text-white text-[14px]"
                        href="/mikroblog/tag/plech"
                      >
                        #plech
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="p-[15px_15px_10px] w-full float-left bg-[#313131] pb-[24px]">
                  <h4 className="text-[11px] font-bold text-[#6e7578] m-[0_0_8px]">
                    Obserwowane tagi
                  </h4>
                  <ul className="mb-[5px]">
                    <li className="italic text-[#b6babb] float-left text-[11px] mr-[15px]">
                      Brak tagów obserwowanych
                    </li>
                  </ul>
                </div>
                <div className="p-[15px_15px_10px] w-full float-left bg-[#313131] pb-[24px]">
                  <h4 className="text-[11px] font-bold text-[#6e7578] m-[0_0_8px]">
                    Czarna lista tagów
                  </h4>
                  <ul className="mb-[5px]">
                    <li className="italic text-[#b6babb] float-left text-[11px] mr-[15px]">
                      Brak tagów odrzuconych
                    </li>
                  </ul>
                </div>
                <div className="w-full p-[8px_15px] bg-[#4a4a4a] float-left mb-[24px]">
                  <button className="text-[12px] text-[#b3d734]">
                    Zarządzaj tagami i czarnymi listami
                  </button>
                </div>
              </div>
            </div>
            <ul className="text-center">
              <li>
                <button className="text-[#6e7578] bg-transparent">
                  Regulamin
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-2/3 float-left relative min-h-[1px] px-[15px]"></div>
      </div>
    </div>
  );
};

export default MikroblogLayout;
