"use client";

import Hr from "@/app/components/Hr";
import AccountDetailsForm from "../forms/AccountDetailsForm";
import AvatarForm from "../forms/AvatarForm";

const UserDataTab = () => {
  return (
    <>
      <AccountDetailsForm />
      <Hr />
      <AvatarForm />
    </>
  );
};

export default UserDataTab;
