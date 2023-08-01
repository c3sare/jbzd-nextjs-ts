import getSession from "@/app/actions/getSession";
import getUserData from "@/app/actions/getUserData";
import AccountDetailsForm from "./components/forms/UserDataForms/AccountDetailsForm";
import Hr from "@/app/components/Hr";
import AvatarForm from "./components/forms/UserDataForms/AvatarForm";
import ChangePasswordForm from "./components/forms/UserDataForms/ChangePasswordForm";
import { getAvatar } from "@/app/actions/getAvatar";

export const revalidate = 0;

const UserSettings = async () => {
  const session = await getSession();
  const userData = await getUserData();
  const avatar = await getAvatar();

  if (!session || !userData) {
    return null;
  }

  const isCredentialProvider = session.user?.provider === "credentials";

  return (
    <>
      <AccountDetailsForm userData={userData} />
      <Hr />
      <AvatarForm avatar={avatar} />
      {isCredentialProvider && (
        <>
          <Hr />
          <ChangePasswordForm />
        </>
      )}
    </>
  );
};

export default UserSettings;
