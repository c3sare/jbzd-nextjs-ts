import { PreferencesType } from "../../tabs/UserPreferencesTab";
import ActionBox from "./components/ActionBox";
import Header from "./components/Header";

type ActionedTagsProps = {
  actionedTags: PreferencesType["actionedTags"];
  handleDeleteTagAction: (id: string) => void;
};

type ActionedTagsType = ActionedTagsProps["actionedTags"][number];

const ActionedTags: React.FC<ActionedTagsProps> = ({
  actionedTags,
  handleDeleteTagAction,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/tags";

  const followedTags = actionedTags.filter((tag) => tag.method === "FOLLOW");
  const blockedTags = actionedTags.filter((tag) => tag.method === "BLOCK");

  return (
    <>
      <Header>Zarzadzanie tagami</Header>
      <ActionBox<ActionedTagsType>
        items={followedTags}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        handleDelete={handleDeleteTagAction}
        objectKey="tag"
        nameKey="name"
      />
      <ActionBox<ActionedTagsType>
        items={blockedTags}
        title="Blokowane"
        deleteEndpoint={deleteEndpoint}
        handleDelete={handleDeleteTagAction}
        objectKey="tag"
        nameKey="name"
      />
    </>
  );
};

export default ActionedTags;
