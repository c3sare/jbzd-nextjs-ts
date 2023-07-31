import ActionItem from "./components/ActionItem";
import type { PreferencesType } from "../../tabs/UserPreferencesTab";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";

type ActionedUsersProp = {
  actionedUsers: PreferencesType["actionedByUsers"];
  handleDeleteUserAction: (id: string) => void;
};

const ActionedUsers: React.FC<ActionedUsersProp> = ({
  actionedUsers,
  handleDeleteUserAction,
}) => {
  const followedUsers = actionedUsers.filter(
    (action) => action.method === "FOLLOW"
  );
  const blockedUsers = actionedUsers.filter(
    (action) => action.method === "BLOCK"
  );

  const deleteEndpoint = "/api/user/settings/preferences/users";

  return (
    <>
      <Header>Zarządzanie użytkownikami</Header>
      {followedUsers.length > 0 && (
        <>
          <SubHeader>Obserwowane</SubHeader>
          <div>
            {followedUsers.map((follow) => (
              <ActionItem
                key={follow.id}
                endpoint={deleteEndpoint}
                id={follow.id}
                title={follow.user.username!}
                deleteFunction={handleDeleteUserAction}
              />
            ))}
          </div>
        </>
      )}
      {blockedUsers.length > 0 && (
        <>
          <SubHeader>Blokowane</SubHeader>
          <div>
            {blockedUsers.map((block) => (
              <ActionItem
                key={block.id}
                endpoint={deleteEndpoint}
                id={block.id}
                title={block.user.username!}
                deleteFunction={handleDeleteUserAction}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ActionedUsers;
