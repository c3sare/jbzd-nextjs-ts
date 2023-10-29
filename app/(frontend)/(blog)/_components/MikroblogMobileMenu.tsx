import Image from "next/image";
import rankBg from "@/public/images/ranks.png";
import UserInfoBoxLink from "../mikroblog/_components/layout/sidebar/authorized/UserInfoBoxLink";
import ButtonShowHideActions from "./ButtonShowHideActions";
import Box from "./Box";
import EmptyBoxItem from "./EmptyBoxItem";
import BoxItem from "./BoxItem";
import MenuLink from "./MenuLink";
import { getSession } from "@/actions/getSession";

const MikroblogMobileMenu = async () => {
  const session = await getSession();

  const isAuthorized = Boolean(session?.user?.id);

  const username = session?.user?.username;
  const image = session?.user?.image;

  return (
    <div className="md:hidden fixed top-[46px] left-0 w-full h-[calc(100vh-46px)] bg-[#313131] pt-0 overflow-y-auto">
      {isAuthorized && (
        <div className="bg-[#313131]">
          <div className="p-[25px] text-white">
            <span className="w-[55px] h-[55px] border-2 border-[#172525] float-left rounded-full overflow-hidden relative">
              <Image
                src={image || "/images/avatars/default.jpg"}
                width={55}
                height={55}
                alt="Avatar"
              />
            </span>
            <div className="ml-[75px]">
              <h2 className="text-white text-[15px] mb-[5px]">
                <span
                  className="float-none align-middle mr-[5px] w-[28px] h-[28px] inline-block rounded-full overflow-hidden"
                  style={{
                    background: `url(${rankBg.src}) no-repeat`,
                    backgroundPosition: "-28px 0",
                  }}
                />
                {username}
              </h2>
              <ul className="text-white mx-auto">
                <UserInfoBoxLink href={`/uzytkownik/${username}`}>
                  Mój profil
                </UserInfoBoxLink>
                <UserInfoBoxLink href="/uzytkownik/ustawienia">
                  Ustawienia
                </UserInfoBoxLink>
                <UserInfoBoxLink href="/mikroblog/ulubione">
                  Ulubione
                </UserInfoBoxLink>
              </ul>
            </div>
          </div>
          <ButtonShowHideActions>
            <div className="py-[15px] px-[25px] pt-0">
              <div className="flex flex-col">
                <Box title="Polecane tagi:">
                  {[...Array(10)].map((_item, i) => (
                    <BoxItem
                      key={i}
                      name="plech"
                      count={9999}
                      href="/mikroblog/tag/plech"
                    />
                  ))}
                </Box>
                <Box title="Obserwowane tagi">
                  <EmptyBoxItem />
                </Box>
                <Box title="Czarna lista tagów">
                  <EmptyBoxItem />
                </Box>
              </div>
            </div>
          </ButtonShowHideActions>
        </div>
      )}
      <ul className="w-full px-[25px] text-left mt-[25px]">
        <MenuLink isActive title="Mikroblog" href="/mikroblog" />
        <MenuLink title="Oczekujące" href="/oczekujace" />
        <MenuLink title="Obserwowane" href="/obserwowane/dzialy" />
        <MenuLink title="Losowe" href="/" />
        <MenuLink title="Działy" href="/" />
      </ul>
    </div>
  );
};

export default MikroblogMobileMenu;
