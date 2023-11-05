import { PropsWithChildren } from "react";

const Quote: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <code className="bg-[#6e7578] p-[10px] rounded-[2px] w-full block my-[10px]">
      {children}
    </code>
  );
};

export default Quote;
