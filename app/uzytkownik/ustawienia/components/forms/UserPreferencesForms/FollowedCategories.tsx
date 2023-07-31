import { PreferencesType } from "../../tabs/UserPreferencesTab";
import ActionItem from "./components/ActionItem";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";

type FollowedCategoriesProps = {
  followedCategories: PreferencesType["followedCategories"];
  handleDeleteFollowedCategory: (id: string) => void;
};

const FollowedCategories: React.FC<FollowedCategoriesProps> = ({
  followedCategories,
  handleDeleteFollowedCategory,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/categories";

  return (
    <>
      <Header>Zarządzanie działami</Header>
      {followedCategories.length > 0 && (
        <>
          <SubHeader>Obserwowane</SubHeader>
          <div>
            {followedCategories.map((follow) => (
              <ActionItem
                key={follow.id}
                endpoint={deleteEndpoint}
                id={follow.id}
                title={follow.category.name}
                deleteFunction={handleDeleteFollowedCategory}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FollowedCategories;
