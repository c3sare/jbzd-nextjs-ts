import { PropsWithChildren } from "react";
import Main from "../components/Main";
import Wrapper from "../components/Wrapper";

const WithoutSidebarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Main border={false}>{children}</Main>
    </Wrapper>
  );
};

export default WithoutSidebarLayout;
