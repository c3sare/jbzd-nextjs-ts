import { PropsWithChildren } from "react";

const ErrorBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#c23d3a] block px-[10px] py-[2px] text-white text-[11px]">
      {children}
    </div>
  );
};

export default ErrorBox;
