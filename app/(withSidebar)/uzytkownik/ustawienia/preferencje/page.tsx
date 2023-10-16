import { getUserPreferences } from "@/actions/getUserPreferences";
import PreferencesForms from "./components/PreferencesForms";

const PreferencesPage = async () => {
  const data = await getUserPreferences();

  if (!data) return new Error("Nie jesteś zalogowany!");

  return (
    <>
      <PreferencesForms data={data} />
    </>
  );
};

export default PreferencesPage;
