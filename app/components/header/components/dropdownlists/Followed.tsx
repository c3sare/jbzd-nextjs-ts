"use client";

import DropdownLinkElement from "./components/followed/DropdownLinkElement";

const Followed = () => {
  return (
    <div className="p-[15px] w-full">
      <DropdownLinkElement href="/obserwowane/dzialy">
        Działy
      </DropdownLinkElement>
      <DropdownLinkElement href="/obserwowane/uzytkownicy">
        Użytkownicy
      </DropdownLinkElement>
    </div>
  );
};

export default Followed;
