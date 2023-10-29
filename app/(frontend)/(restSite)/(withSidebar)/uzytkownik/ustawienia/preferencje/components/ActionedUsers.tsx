"use client";

import Header from "./Header";
import ActionBox from "./ActionBox";
import { User, UserAction } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type ActionUsersBoxType = UserAction & {
  user: Pick<User, "username" | "id">;
};

type ActionedUsersProp = {
  actionedUsers: ActionUsersBoxType[];
  lockBoxes: boolean;
  setLockBoxes: Dispatch<SetStateAction<boolean>>;
};

const ActionedUsers: React.FC<ActionedUsersProp> = ({
  actionedUsers,
  lockBoxes,
  setLockBoxes,
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
      <ActionBox<ActionUsersBoxType>
        items={followedUsers}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="user"
        nameKey="username"
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
      />
      <ActionBox<ActionUsersBoxType>
        items={blockedUsers}
        title="Blokowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="user"
        nameKey="username"
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
      />
    </>
  );
};

export default ActionedUsers;
