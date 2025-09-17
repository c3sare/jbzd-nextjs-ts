"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import FacebookLoginButton from "./components/FacebookLoginButton";
import GoogleLoginButton from "./components/GoogleLoginButton";
import useZodForm from "@/hooks/useZodForm";
import LoginSchema from "@/validators/Sidebar/LoginSchema";
import { logInWithCredentials } from "./actions/logInWithCredentials";
import { FormProvider } from "react-hook-form";

const LoginForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const form = useZodForm({
    schema: LoginSchema,
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    logInWithCredentials(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Input id="login" placeholder="Podaj nick lub email" />
        <Input type="password" id="password" placeholder="Hasło" />
        <Button type="submit">Zaloguj się</Button>
      </form>
      {children}
      <FacebookLoginButton disabled={form.formState.isLoading} />
      <GoogleLoginButton disabled={form.formState.isLoading} />
    </FormProvider>
  );
};

export default LoginForm;
