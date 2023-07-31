import { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="block text-[22px] text-white my-[25px] text-center">
      {children}
    </h2>
  );
};

export default Header;
