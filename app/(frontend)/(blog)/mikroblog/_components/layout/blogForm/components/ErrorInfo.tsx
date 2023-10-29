import { PropsWithChildren } from "react";

const ErrorInfo: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#c23d3a] block p-[2px_10px] text-white text-[11px] clear-both my-1">
      {children}
    </div>
  );
};

export default ErrorInfo;
