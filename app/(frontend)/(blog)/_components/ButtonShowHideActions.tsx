"use client";

import { PropsWithChildren, useState } from "react";

const ButtonShowHideActions: React.FC<PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      {isVisible && children}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-full bg-[#4a4a4a] text-[12px] text-[#b3d734] text-left px-[25px] leading-[30px] block"
      >
        Pokaż więcej
      </button>
    </>
  );
};

export default ButtonShowHideActions;
