import type { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="font-bold text-white text-[16px] mb-[10px] flex gap-[10px] items-center">
      {children}
    </h2>
  );
};

export default Header;
