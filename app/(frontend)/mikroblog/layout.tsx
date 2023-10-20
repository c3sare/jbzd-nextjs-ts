import { PropsWithChildren } from "react";
import MikroblogSidebar from "./_components/layout/sidebar/MikroblogSidebar";
import UserInfoTab from "./_components/layout/sidebar/tabs/UserInfoTab";
import TagsManagingTab from "./_components/layout/sidebar/tabs/TagsManagingTab";
import UserInfoBox from "./_components/layout/sidebar/UserInfoBox";
import UserInfoBoxLink from "./_components/layout/sidebar/UserInfoBoxLink";
import AddBlogForm from "./_components/layout/blogForm/AddBlogForm";
import BlogNavbar from "./_components/layout/BlogNavbar";
import BlogNavbarItem from "./_components/layout/BlogNavbarItem";

const MikroblogLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-[1110px] mx-auto px-[15px] mt-[45px]">
      <div className="mx-[-15px]">
        <div className="float-right w-1/3 relative min-h-[1px] px-[15px]">
          <div>
            <div className="mt-[108px] relative bg-[#313131] pb-[24px]">
              <UserInfoBox avatar={undefined} username="c3sare">
                <UserInfoBoxLink href="/uzytkownik/c3sare">
                  Mój profil
                </UserInfoBoxLink>
                <UserInfoBoxLink href="/uzytkownik/ustawienia">
                  Ustawienia
                </UserInfoBoxLink>
                <UserInfoBoxLink href="/mikroblog/ulubione">
                  Ulubione
                </UserInfoBoxLink>
              </UserInfoBox>
              <div className="bg-[#313131]"></div>
              <MikroblogSidebar>
                <UserInfoTab />
                <TagsManagingTab />
              </MikroblogSidebar>
            </div>
            <ul className="mb-4 text-center">
              <li>
                <button className="text-[#6e7578] bg-transparent">
                  Regulamin
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-2/3 float-left relative min-h-[1px] px-[15px]">
          <AddBlogForm />
          <BlogNavbar>
            <BlogNavbarItem href="/mikroblog">Najnowsze</BlogNavbarItem>
            <BlogNavbarItem href="/mikroblog/aktywne">Aktywne</BlogNavbarItem>
            <BlogNavbarItem href="/mikroblog/gorace">Gorące</BlogNavbarItem>
            <BlogNavbarItem href="/mikroblog/obserwowane">
              Obserwowane
            </BlogNavbarItem>
            <BlogNavbarItem href="/mikroblog/moje">Moje</BlogNavbarItem>
          </BlogNavbar>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MikroblogLayout;
