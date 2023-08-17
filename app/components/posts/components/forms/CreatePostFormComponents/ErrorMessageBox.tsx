import { PropsWithChildren } from "react";

const ErrorMessageBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="text-[#c03e3e] text-[11px] block pl-1 my-[10px] relative text-left clear-both">
      {children}
    </span>
  );
};

export default ErrorMessageBox;
