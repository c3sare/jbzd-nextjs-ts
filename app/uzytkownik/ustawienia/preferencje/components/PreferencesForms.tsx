"use client";

import { useState } from "react";
import ActionedTags, { ActionTagsBoxType } from "./ActionedTags";
import ActionedUsers, { ActionUsersBoxType } from "./ActionedUsers";
import FollowedCategories, {
  ActionCategoriesBoxType,
} from "./FollowedCategories";

type PreferencesFormsProps = {
  data: {
    actionedTags: ActionTagsBoxType[];
    actionedUsers: ActionUsersBoxType[];
    followedCategories: ActionCategoriesBoxType[];
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
      <FollowedCategories
        lockBoxes={lockBoxes}
        setLockBoxes={setLockBoxes}
        followedCategories={data.followedCategories}
      />
    </>
  );
};

export default PreferencesForms;
