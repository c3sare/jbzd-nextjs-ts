"use client";

import Input from "./components/Input";
import Button from "./components/Button";
import { Dispatch, SetStateAction, useState } from "react";
import useZodForm from "@/app/hooks/useZodForm";
import GetTokenSchema, {
  GetTokenType,
} from "@/app/formSchemas/PasswordRemindForms/GetTokenSchema";
import ZodForm from "@/app/components/forms/ZodForm";
import PasswordResetSchema, {
  PasswordResetType,
} from "@/app/formSchemas/PasswordRemindForms/PasswordResetSchema";

type EmailVerificationFormProps = {
  setNextStep: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = ({
  setNextStep,
  setEmail,
}) => {
  const { zodFormComponentProps } = useZodForm<GetTokenType>({
    zodSchema: GetTokenSchema,
    pushFormDataEndpoint: "/api/user/password/remind",
    successDataFetchCallback: (data) => {
      setEmail(data?.data.email || "");
      setNextStep();
    },
    customSuccessMessage: "Token został wysłany na wybrany adres e-mail.",
  });

  return (
    <ZodForm {...zodFormComponentProps}>
      <Input placeholder="Adres email" id="email" />
      <Button type="submit">Wyślij link resetujący hasło</Button>
    </ZodForm>
  );
};

type TokenValidationForm = {
  setIndexOfCurrentForm: Dispatch<SetStateAction<number>>;
  email: string;
};

const TokenValidationForm: React.FC<TokenValidationForm> = ({
  setIndexOfCurrentForm,
  email,
}) => {
  const { zodFormComponentProps } = useZodForm<PasswordResetType>({
    zodSchema: PasswordResetSchema,
    pushFormDataEndpoint: "/api/user/password/change",
    successDataFetchCallback: () => {
      setIndexOfCurrentForm(0);
    },
    customSuccessMessage: "Hasło zostało pomyślnie zmienione!",
    defaultFormValues: {
      email,
    },
  });

  return (
    <ZodForm {...zodFormComponentProps}>
      <Input hidden id="email" />
      <Input id="token" placeholder="TOKEN" />
      <Input type="password" id="password" placeholder="Nowe Hasło" />
      <Input type="password" id="repassword" placeholder="Powtórz Nowe Hasło" />
      <Button type="submit">Zmień hasło</Button>
    </ZodForm>
  );
};

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
        <EmailVerificationForm setEmail={setEmail} setNextStep={setNextStep} />
      )}
      {passwordRemindStep === "tokenValidation" && (
        <TokenValidationForm
          email={email}
          setIndexOfCurrentForm={setIndexOfCurrentForm}
        />
      )}
      {children}
    </>
  );
};

export default PasswordRemindForm;
