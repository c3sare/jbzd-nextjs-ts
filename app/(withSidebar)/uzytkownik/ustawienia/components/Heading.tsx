import { PropsWithChildren } from "react";

const Heading: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="font-bold text-[16px] my-4">{children}</h3>;
};

export default Heading;
