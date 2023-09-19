"use client";

import { TagAction } from "@prisma/client";
import ActionBox from "./ActionBox";
import Header from "./Header";
import { Dispatch, SetStateAction } from "react";

export type ActionTagsBoxType = TagAction & {
  tag: {
    name: string;
  };
};

type ActionedTagsProps = {
  actionedTags: (TagAction & ActionTagsBoxType)[];
  lockBoxes: boolean;
  setLockBoxes: Dispatch<SetStateAction<boolean>>;
};

const ActionedTags: React.FC<ActionedTagsProps> = ({
  actionedTags,
  lockBoxes,
  setLockBoxes,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/tags";

  const followedTags = actionedTags.filter((tag) => tag.method === "FOLLOW");
  const blockedTags = actionedTags.filter((tag) => tag.method === "BLOCK");

  return (
    <>
      <Header>Zarzadzanie tagami</Header>
      <ActionBox<ActionTagsBoxType>
        items={followedTags}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="tag"
        nameKey="name"
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
        hashBeforeName
      />
      <ActionBox<ActionTagsBoxType>
        items={blockedTags}
        title="Blokowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="tag"
        nameKey="name"
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
        hashBeforeName
      />
    </>
  );
};

export default ActionedTags;
