import { PropsWithChildren } from "react";

const SubHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="mb-[15px]">{children}</h3>;
};

export default SubHeader;
