import { getUserPreferences } from "@/actions/getUserPreferences";
import PreferencesForms from "./components/PreferencesForms";

const PreferencesPage = async () => {
  const data = await getUserPreferences();

  if (!data) return null;

  return (
    <>
      <PreferencesForms data={data} />
    </>
  );
};

export default PreferencesPage;
