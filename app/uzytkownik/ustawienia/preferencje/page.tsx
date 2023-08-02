import { getUserPreferences } from "@/app/actions/getUserPreferences";
import ActionedTags from "../components/forms/UserPreferencesForms/ActionedTags";
import ActionedUsers from "../components/forms/UserPreferencesForms/ActionedUsers";
import FollowedCategories from "../components/forms/UserPreferencesForms/FollowedCategories";

export const fetchCache = "force-no-store";

const PreferencesPage = async () => {
  const data = await getUserPreferences();

  if (!data) return new Error("Nie jesteś zalogowany!");

  const { followedCategories, actionedUsers, actionedTags } = data;

  return (
    <>
      <ActionedTags actionedTags={actionedTags} />
      <ActionedUsers actionedUsers={actionedUsers} />
      <FollowedCategories followedCategories={followedCategories} />
    </>
  );
};

export default PreferencesPage;
