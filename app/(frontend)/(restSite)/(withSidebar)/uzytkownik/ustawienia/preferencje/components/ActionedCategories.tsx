"use client";

import { Category, CategoryAction } from "@prisma/client";
import ActionBox from "./ActionBox";
import Header from "../components/Header";
import { Dispatch, SetStateAction } from "react";

export type ActionCategoriesBoxType = CategoryAction & {
  category: Category;
};

type ActionedCategoriesProps = {
  actionedCategories: ActionCategoriesBoxType[];
  lockBoxes: boolean;
  setLockBoxes: Dispatch<SetStateAction<boolean>>;
};

const ActionedCategories: React.FC<ActionedCategoriesProps> = ({
  actionedCategories,
  lockBoxes,
  setLockBoxes,
}) => {
  const deleteEndpoint = "/api/user/settings/preferences/categories";

  const followedCategories = actionedCategories.filter(
    (item) => item.method === "FOLLOW"
  );
  const blockedCategories = actionedCategories.filter(
    (item) => item.method === "BLOCK"
  );

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
      <ActionBox<ActionCategoriesBoxType>
        items={blockedCategories}
        title="Wyciszone"
        deleteEndpoint={deleteEndpoint}
        objectKey="category"
        nameKey="name"
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
      />
    </>
  );
};

export default ActionedCategories;
