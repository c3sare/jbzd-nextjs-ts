import getPremium from "@/app/actions/getPremium";
import UserPremiumForm from "../components/forms/UserPremiumForm";

export const dynamic = "force-dynamic";

const PremiumPage = async () => {
  const data = await getPremium();

  if (!data) return Error("Nie jesteś zalogowany!");

  return <UserPremiumForm data={data} />;
};

export default PremiumPage;
