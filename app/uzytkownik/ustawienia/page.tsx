import { getSession } from "@/app/actions/getSession";
import { getUserData } from "@/app/actions/getUserData";
import AccountDetailsForm from "./components/forms/UserDataForms/AccountDetailsForm";
import Hr from "@/app/components/Hr";
import AvatarForm from "./components/forms/UserDataForms/AvatarForm";
import ChangePasswordForm from "./components/forms/UserDataForms/ChangePasswordForm";
import { getAvatar } from "@/app/actions/getAvatar";
import DeleteAccountForm from "./components/forms/UserDataForms/DeleteAccountForm";

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
