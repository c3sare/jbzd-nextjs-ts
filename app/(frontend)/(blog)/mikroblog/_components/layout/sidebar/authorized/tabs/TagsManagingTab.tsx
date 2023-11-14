import BlockedTagList from "../tagManagment/BlockedTagList";
import FollowedTagList from "../tagManagment/FollowedTagList";

const TagsManagingTab: React.FC = () => {
  return (
    <>
      <FollowedTagList editable />
      <BlockedTagList editable />
    </>
  );
};

export default TagsManagingTab;
