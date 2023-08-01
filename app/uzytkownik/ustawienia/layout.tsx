import Link from "next/link";
import { PropsWithChildren } from "react";
import LinkButton from "./components/LinkButton";

const SettingsLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="flex w-full gap-[2px] z-[-1]">
        <LinkButton href="/uzytkownik/ustawienia">Dane</LinkButton>
        <LinkButton href="/uzytkownik/ustawienia/preferencje">
          Preferencje
        </LinkButton>
        <LinkButton href="/uzytkownik/ustawienia/notyfikacje">
          Notyfikacje
        </LinkButton>
        <LinkButton href="/uzytkownik/ustawienia/premium">Premium</LinkButton>
      </div>
      <div className="bg-[#313131] z-10 p-[35px_15px]">{children}</div>
    </div>
  );
};

export default SettingsLayout;
