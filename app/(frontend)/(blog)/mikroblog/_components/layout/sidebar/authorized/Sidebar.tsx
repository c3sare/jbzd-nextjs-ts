import { getSession } from "@/actions/getSession";
import MikroblogSidebar from "./MikroblogSidebar";
import UserInfoBox from "./UserInfoBox";
import UserInfoBoxLink from "./UserInfoBoxLink";
import TagsManagingTab from "./tabs/TagsManagingTab";
import UserInfoTab from "./tabs/UserInfoTab";

const Sidebar = async () => {
  const session = await getSession();

  if (!session || !session.user) return null;

  const { image, username } = session.user;

  return (
    <div className="mt-[108px] relative bg-[#313131] pb-[24px] pt-2">
      <UserInfoBox avatar={image} username={username}>
        <UserInfoBoxLink href={`/uzytkownik/${username}`}>
          Mój profil
        </UserInfoBoxLink>
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
