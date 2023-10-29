"use client";

import { useState } from "react";
import SwitchTabButton from "./SwitchTabButton";

type MikroblogSidebarProps = {
  children: [JSX.Element, JSX.Element];
};

const MikroblogSidebar: React.FC<MikroblogSidebarProps> = ({ children }) => {
  const [isManagingTags, setIsManagingTags] = useState<boolean>(false);

  return (
    <div className="bg-[#313131]">
      {children[Number(isManagingTags)]}
      <div className="w-full p-[8px_15px] bg-[#4a4a4a] float-left mb-[24px]">
        <SwitchTabButton
          onClick={() => setIsManagingTags(!isManagingTags)}
          isActive={isManagingTags}
        >
          Zarządzaj tagami i czarnymi listami
        </SwitchTabButton>
      </div>
    </div>
  );
};

export default MikroblogSidebar;
