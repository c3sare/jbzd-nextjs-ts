"use client";

import { useState } from "react";
import SwitchButton from "./SwitchButton";
import UserDataTab from "./tabs/UserDataTab";
import UserPreferencesTab from "./tabs/UserPreferencesTab";
import UserNotyficationsTab from "./tabs/UserNotifycationsTab";
import UserPremiumTab from "./tabs/UserPremiumTab";

const PageSwitch = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const tabs = [
    {
      name: "Dane",
      Component: <UserDataTab />,
    },
    {
      name: "Preferencje",
      Component: <UserPreferencesTab />,
    },
    {
      name: "Notyfikacje",
      Component: <UserNotyficationsTab />,
    },
    {
      name: "Premium",
      Component: <UserPremiumTab />,
      style: {
        color: "#b4d132",
        fontWeight: "700",
      },
    },
  ];

  const currentElement = tabs[currentTab].Component;

  return (
    <div className="w-full">
      <div className="flex w-full gap-[2px] z-[-1]">
        {tabs.map((item, i) => (
          <SwitchButton
            active={currentTab === i}
            key={i}
            onClick={() => setCurrentTab(i)}
            style={item.style || {}}
          >
            {item.name}
          </SwitchButton>
        ))}
      </div>
      <div className="bg-[#313131] z-10 p-[35px_15px]">{currentElement}</div>
    </div>
  );
};

export default PageSwitch;
