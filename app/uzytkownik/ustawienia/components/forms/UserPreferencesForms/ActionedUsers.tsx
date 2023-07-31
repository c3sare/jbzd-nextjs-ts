import type { PreferencesType } from "../../tabs/UserPreferencesTab";
import Header from "./components/Header";
import ActionBox from "./components/ActionBox";

type ActionedUsersProp = {
  actionedUsers: PreferencesType["actionedByUsers"];
  handleDeleteUserAction: (id: string) => void;
};

type ActionedUsersType = ActionedUsersProp["actionedUsers"][number];

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
      <ActionBox<ActionedUsersType>
        items={followedUsers}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        handleDelete={handleDeleteUserAction}
        objectKey="user"
        nameKey="username"
      />
      <ActionBox<ActionedUsersType>
        items={blockedUsers}
        title="Blokowane"
        deleteEndpoint={deleteEndpoint}
        handleDelete={handleDeleteUserAction}
        objectKey="user"
        nameKey="username"
      />
    </>
  );
};

export default ActionedUsers;
