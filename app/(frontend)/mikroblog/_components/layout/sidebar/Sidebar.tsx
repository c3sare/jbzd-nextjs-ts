import MikroblogSidebar from "./MikroblogSidebar";
import UserInfoBox from "./UserInfoBox";
import UserInfoBoxLink from "./UserInfoBoxLink";
import TagsManagingTab from "./tabs/TagsManagingTab";
import UserInfoTab from "./tabs/UserInfoTab";

const Sidebar = () => {
  return (
    <div className="mt-[108px] relative bg-[#313131] pb-[24px]">
      <UserInfoBox avatar={undefined} username="c3sare">
        <UserInfoBoxLink href="/uzytkownik/c3sare">Mój profil</UserInfoBoxLink>
        <UserInfoBoxLink href="/uzytkownik/ustawienia">
          Ustawienia
        </UserInfoBoxLink>
        <UserInfoBoxLink href="/mikroblog/ulubione">Ulubione</UserInfoBoxLink>
      </UserInfoBox>
      <div className="bg-[#313131]"></div>
      <MikroblogSidebar>
        <UserInfoTab />
        <TagsManagingTab />
      </MikroblogSidebar>
    </div>
  );
};

export default Sidebar;
