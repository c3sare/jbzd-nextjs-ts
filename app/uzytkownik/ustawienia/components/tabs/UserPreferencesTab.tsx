import { useCallback, useEffect, useState } from "react";
import ActionedUsers from "../forms/UserPreferencesForms/ActionedUsers";
import {
  Category,
  FollowedCategory,
  Tag,
  TagAction,
  User,
  UserAction,
} from "@prisma/client";
import axios from "axios";
import LoadingBox from "@/app/components/LoadingBox";
import ErrorBox from "@/app/components/forms/ErrorBox";
import FollowedCategories from "../forms/UserPreferencesForms/FollowedCategories";
import ActionedTags from "../forms/UserPreferencesForms/ActionedTags";

export type PreferencesType = {
  followedCategories: (FollowedCategory & {
    category: Category;
  })[];
  actionedByUsers: (UserAction & {
    user: Pick<User, "id" | "username" | "email">;
  })[];
  actionedTags: (TagAction & {
    tag: Tag;
  })[];
};

const cache: {
  [key: string]: any;
} = {};

const UserPreferencesTab = () => {
  const endpointGetUrl = "/api/user/settings/preferences";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<PreferencesType>({
    followedCategories: [],
    actionedByUsers: [],
    actionedTags: [],
  });

  const handleDeleteFollowedCategory = (id: string) => {
    setPreferences((prevState) => {
      const newState = { ...prevState };

      newState.followedCategories = newState.followedCategories.filter(
        (category) => category.id !== id
      );
      cache[endpointGetUrl] = newState;
      return newState;
    });
  };

  const handleDeleteUserAction = (id: string) => {
    setPreferences((prevState) => {
      const newState = { ...prevState };

      newState.actionedByUsers = newState.actionedByUsers.filter(
        (userAction) => userAction.id !== id
      );

      cache[endpointGetUrl] = newState;
      return newState;
    });
  };

  const handleDeleteTagAction = (id: string) => {
    setPreferences((prevState) => {
      const newState = { ...prevState };

      newState.actionedTags = newState.actionedTags.filter(
        (tagAction) => tagAction.id !== id
      );

      cache[endpointGetUrl] = newState;
      return newState;
    });
  };

  const getInitialData = useCallback(() => {
    if (!cache[endpointGetUrl]) {
      if (error) setError(false);
      if (!isLoading) setIsLoading(true);
      axios
        .get(endpointGetUrl)
        .then((res) => {
          setPreferences(res.data);
          cache[endpointGetUrl] = res.data;
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        })
        .finally(() => setIsLoading(false));
    } else setPreferences(cache[endpointGetUrl]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <div className="relative">
      <ActionedTags
        handleDeleteTagAction={handleDeleteTagAction}
        actionedTags={preferences.actionedTags}
      />
      <ActionedUsers
        handleDeleteUserAction={handleDeleteUserAction}
        actionedUsers={preferences.actionedByUsers}
      />
      <FollowedCategories
        handleDeleteFollowedCategory={handleDeleteFollowedCategory}
        followedCategories={preferences.followedCategories}
      />
      {isLoading && <LoadingBox />}
      {error && <ErrorBox onClick={getInitialData} />}
    </div>
  );
};

export default UserPreferencesTab;
