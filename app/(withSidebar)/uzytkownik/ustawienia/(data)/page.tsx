import { getSession } from "@/app/actions/getSession";
import { getUserData } from "@/app/actions/getUserData";
import AccountDetailsForm from "./components/AccountDetailsForm";
import Hr from "@/app/components/Hr";
import AvatarForm from "./components/AvatarForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { getAvatar } from "@/app/actions/getAvatar";
import DeleteAccountForm from "./components/DeleteAccountForm";

const UserSettings = async () => {
  const session = await getSession();
  const userData = await getUserData();
  const avatar = await getAvatar();

  if (!session || !userData) {
    return new Error("Nie jesteś zalogowany!");
  }

  const isCredentialProvider = session.user?.provider === "credentials";

  return (
    <>
      <AccountDetailsForm userData={userData} />
      <Hr />
      <AvatarForm avatar={avatar || "/images/avatars/default.jpg"} />
      {isCredentialProvider && (
        <>
          <Hr />
          <ChangePasswordForm />
        </>
      )}
      <Hr />
      <DeleteAccountForm />
    </>
  );
};

export default UserSettings;
