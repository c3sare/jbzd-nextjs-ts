"use client";

import Header from "./components/Header";
import ActionBox from "./components/ActionBox";
import { User, UserAction } from "@prisma/client";

type ActionBoxType = UserAction & { user: Pick<User, "username" | "id"> };

type ActionedUsersProp = {
  actionedUsers: ActionBoxType[];
};

const ActionedUsers: React.FC<ActionedUsersProp> = ({ actionedUsers }) => {
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
      <ActionBox<ActionBoxType>
        items={followedUsers}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="user"
        nameKey="username"
      />
      <ActionBox<ActionBoxType>
        items={blockedUsers}
        title="Blokowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="user"
        nameKey="username"
      />
    </>
  );
};

export default ActionedUsers;
