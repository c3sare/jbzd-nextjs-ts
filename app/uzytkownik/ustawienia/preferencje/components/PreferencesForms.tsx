"use client";

import { useState } from "react";
import ActionedTags, { ActionTagsBoxType } from "./ActionedTags";
import ActionedUsers, { ActionUsersBoxType } from "./ActionedUsers";
import ActionedCategories, {
  ActionCategoriesBoxType,
} from "./ActionedCategories";

type PreferencesFormsProps = {
  data: {
    actionedTags: ActionTagsBoxType[];
    actionedUsers: ActionUsersBoxType[];
    actionedCategories: ActionCategoriesBoxType[];
  };
};

const PreferencesForms: React.FC<PreferencesFormsProps> = ({ data }) => {
  const [lockBoxes, setLockBoxes] = useState<boolean>(false);

  return (
    <>
      <ActionedTags
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
        actionedTags={data.actionedTags}
      />
      <ActionedUsers
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
        actionedUsers={data.actionedUsers}
      />
      <ActionedCategories
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
        actionedCategories={data.actionedCategories}
      />
    </>
  );
};

export default PreferencesForms;
