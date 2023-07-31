import { PreferencesType } from "../../tabs/UserPreferencesTab";
import ActionBox from "./components/ActionBox";
import Header from "./components/Header";

type FollowedCategoriesProps = {
  followedCategories: PreferencesType["followedCategories"];
  handleDeleteFollowedCategory: (id: string) => void;
};

type FollowedCategoriesType =
  FollowedCategoriesProps["followedCategories"][number];

const FollowedCategories: React.FC<FollowedCategoriesProps> = ({
  followedCategories,
  handleDeleteFollowedCategory,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/categories";

  return (
    <>
      <Header>Zarządzanie działami</Header>
      <ActionBox<FollowedCategoriesType>
        items={followedCategories}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        handleDelete={handleDeleteFollowedCategory}
        objectKey="category"
        nameKey="name"
      />
    </>
  );
};

export default FollowedCategories;
