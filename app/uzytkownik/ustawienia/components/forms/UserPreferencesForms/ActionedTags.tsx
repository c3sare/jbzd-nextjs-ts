"use client";

import { TagAction } from "@prisma/client";
import ActionBox from "./components/ActionBox";
import Header from "./components/Header";

type ActionBoxType = TagAction & {
  tag: {
    name: string;
  };
};

type ActionedTagsProps = {
  actionedTags: (TagAction & ActionBoxType)[];
};

const ActionedTags: React.FC<ActionedTagsProps> = ({ actionedTags }) => {
  const deleteEndpoint = "/api/user/settings/preferences/tags";

  const followedTags = actionedTags.filter((tag) => tag.method === "FOLLOW");
  const blockedTags = actionedTags.filter((tag) => tag.method === "BLOCK");

  return (
    <>
      <Header>Zarzadzanie tagami</Header>
      <ActionBox<ActionBoxType>
        items={followedTags}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="tag"
        nameKey="name"
        hashBeforeName
      />
      <ActionBox<ActionBoxType>
        items={blockedTags}
        title="Blokowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="tag"
        nameKey="name"
        hashBeforeName
      />
    </>
  );
};

export default ActionedTags;
