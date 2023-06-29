"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./components/Input";
import Button from "./components/Button";
import FacebookLoginButton from "./components/FacebookLoginButton";

const LoginForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/login", data)
      .then((data) => {
        if (data.data.ok) console.log("ok");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="login"
          required
          disabled={isLoading}
          errors={errors}
          register={register}
          placeholder="Podaj nick lub email"
        />
        <Input
          type="password"
          id="password"
          required
          disabled={isLoading}
          errors={errors}
          register={register}
          placeholder="Hasło"
        />
        <Button disabled={isLoading} type="submit">
          Zaloguj się
        </Button>
      </form>
      {children}
      <FacebookLoginButton />
    </>
  );
};

export default LoginForm;
