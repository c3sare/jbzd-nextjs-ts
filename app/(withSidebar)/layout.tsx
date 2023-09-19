import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Wrapper from "../components/Wrapper";

const WithSidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Main>{children}</Main>
      <Sidebar />
    </Wrapper>
  );
};

export default WithSidebarLayout;
