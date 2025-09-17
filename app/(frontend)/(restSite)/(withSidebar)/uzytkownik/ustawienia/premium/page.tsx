import { getPremium } from "@/actions/getPremium";
import UserPremiumForm from "./components/UserPremiumForm";

const PremiumPage = async () => {
  const data = await getPremium();

  if (!data || !data.premium) return null;

  return <UserPremiumForm data={data} />;
};

export default PremiumPage;
