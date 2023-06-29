"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";
import axios from "axios";

const EmailVerificationForm: React.FC<{ setNextStep: () => void }> = ({
  setNextStep,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user/remindpassword", data)
      .then((data) => {
        if (data.data.isEmailValid) setNextStep();
        else {
          console.log("Something get wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        errors={errors}
        placeholder="Adres email"
        id="email"
        required
        disabled={isLoading}
        pattern={{
          value: emailRegexPattern,
          message: "Wprowadzony adres jest nieprawidłowy!",
        }}
      />
      <Button disabled={isLoading} type="submit">
        Wyślij link resetujący hasło
      </Button>
    </form>
  );
};

const TokenValidationForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      token: "",
      password: "",
      repassword: "",
    },
  });

  const checkPasswords = (val: string) => {
    const password = getValues("password");
    const repassword = val;

    if (password !== repassword) return "Hasła muszą być identyczne!";
    else return false;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user/password", data)
      .then((data) => {
        if (data.data.ok) {
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        errors={errors}
        required
        id="token"
        placeholder="TOKEN"
      />
      <Input
        type="password"
        register={register}
        errors={errors}
        required
        id="password"
        placeholder="Nowe Hasło"
      />
      <Input
        type="password"
        register={register}
        errors={errors}
        required
        id="repassword"
        placeholder="Powtórz Nowe Hasło"
        validate={checkPasswords}
      />
      <Button type="submit">Zmień hasło</Button>
    </form>
  );
};

const PasswordRemindForm: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [passwordRemindStep, setPasswordRemindStep] = useState<
    "emailVerification" | "tokenValidation"
  >("emailVerification");

  const setNextStep = () => setPasswordRemindStep("tokenValidation");

  return (
    <>
      {passwordRemindStep === "emailVerification" && (
        <EmailVerificationForm setNextStep={setNextStep} />
      )}
      {passwordRemindStep === "tokenValidation" && <TokenValidationForm />}
      {children}
    </>
  );
};

export default PasswordRemindForm;
