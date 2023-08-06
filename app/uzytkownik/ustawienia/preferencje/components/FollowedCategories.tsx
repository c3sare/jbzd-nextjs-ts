"use client";

import { Category, FollowedCategory } from "@prisma/client";
import ActionBox from "./ActionBox";
import Header from "../components/Header";
import { Dispatch, SetStateAction } from "react";

export type ActionCategoriesBoxType = FollowedCategory & {
  category: Category;
};

type FollowedCategoriesProps = {
  followedCategories: ActionCategoriesBoxType[];
  lockBoxes: boolean;
  setLockBoxes: Dispatch<SetStateAction<boolean>>;
};

const FollowedCategories: React.FC<FollowedCategoriesProps> = ({
  followedCategories,
  lockBoxes,
  setLockBoxes,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/categories";

  return (
    <>
      <Header>Zarządzanie działami</Header>
      <ActionBox<ActionCategoriesBoxType>
        items={followedCategories}
        title="Obserwowane"
        deleteEndpoint={deleteEndpoint}
        objectKey="category"
        nameKey="name"
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
      />
    </>
  );
};

export default FollowedCategories;
