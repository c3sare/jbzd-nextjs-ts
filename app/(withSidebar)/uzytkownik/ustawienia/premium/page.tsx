import { getPremium } from "@/actions/getPremium";
import UserPremiumForm from "./components/UserPremiumForm";

const PremiumPage = async () => {
  const data = await getPremium();

  if (!data || !data.premium) return Error("Nie jesteś zalogowany!");

  return <UserPremiumForm data={data} />;
};

export default PremiumPage;
