"use client";

import { Category, FollowedCategory } from "@prisma/client";
import ActionBox from "./components/ActionBox";
import Header from "./components/Header";

type ActionBoxType = FollowedCategory & {
  category: Category;
};

type FollowedCategoriesProps = {
  followedCategories: ActionBoxType[];
};

const FollowedCategories: React.FC<FollowedCategoriesProps> = ({
  followedCategories,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/categories";

  return (
    <>
      <Header>Zarządzanie działami</Header>
      <ActionBox<ActionBoxType>
        items={followedCategories}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="category"
        nameKey="name"
      />
    </>
  );
};

export default FollowedCategories;
