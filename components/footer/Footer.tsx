import { PropsWithChildren } from "react";

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <footer className="bg-[#181818] text-white p-[15px] flex flex-wrap gap-[10px] items-center justify-center w-full">
      {children}
    </footer>
  );
};

export default Footer;
