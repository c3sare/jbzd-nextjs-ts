"use client";

import Hr from "@/app/components/Hr";
import AccountDetailsForm from "../forms/AccountDetailsForm";
import AvatarForm from "../forms/AvatarForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";

const UserDataTab = () => {
  return (
    <>
      <AccountDetailsForm />
      <Hr />
      <AvatarForm />
      <Hr />
      <ChangePasswordForm />
    </>
  );
};

export default UserDataTab;
