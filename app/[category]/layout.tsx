import { PropsWithChildren } from "react";
import Main from "../components/Main";
import Sidebar from "../components/sidebar/Sidebar";
import Wrapper from "../components/Wrapper";

const CategoryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Main>{children}</Main>
      <Sidebar />
    </Wrapper>
  );
};

export default CategoryLayout;
