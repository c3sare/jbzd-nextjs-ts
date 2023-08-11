import { PropsWithChildren } from "react";

const Information: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="text-[11px] text-[#6e7578] font-normal mb-[10px]">
      {children}
    </p>
  );
};

export default Information;
