"use client";

import Hr from "@/app/components/Hr";
import AccountDetailsForm from "../forms/UserDataForms/AccountDetailsForm";
import AvatarForm from "../forms/UserDataForms/AvatarForm";
import ChangePasswordForm from "../forms/UserDataForms/ChangePasswordForm";
import { useSession } from "next-auth/react";

const UserDataTab = () => {
  const session = useSession();

  const isCredentialProvider = session.data?.user?.provider === "credentials";

  return (
    <>
      <AccountDetailsForm />
      <Hr />
      <AvatarForm />
      {isCredentialProvider && (
        <>
          <Hr />
          <ChangePasswordForm />
        </>
      )}
    </>
  );
};

export default UserDataTab;
