"use client";

import { Dispatch, SetStateAction, useState } from "react";
import GetTokenForm from "./PasswordRemindForms/GetTokenForm";
import PasswordResetForm from "./PasswordRemindForms/PasswordResetForm";

type PasswordRemindFormProps = {
  children?: React.ReactNode;
  setIndexOfCurrentForm: Dispatch<SetStateAction<number>>;
};

const PasswordRemindForm: React.FC<PasswordRemindFormProps> = ({
  children,
  setIndexOfCurrentForm,
}) => {
  const [email, setEmail] = useState<string>("");
  const [passwordRemindStep, setPasswordRemindStep] = useState<
    "emailVerification" | "tokenValidation"
  >("emailVerification");

  const setNextStep = () => setPasswordRemindStep("tokenValidation");

  return (
    <>
      {passwordRemindStep === "emailVerification" && (
        <GetTokenForm setEmail={setEmail} setNextStep={setNextStep} />
      )}
      {passwordRemindStep === "tokenValidation" && (
        <PasswordResetForm
          email={email}
          setIndexOfCurrentForm={setIndexOfCurrentForm}
        />
      )}
      {children}
    </>
  );
};

export default PasswordRemindForm;
