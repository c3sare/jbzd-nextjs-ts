"use client";

import { SubmitHandler } from "react-hook-form";
import Input from "@/app/components/Input";
import Button from "../../../Button";
import FacebookLoginButton from "./components/FacebookLoginButton";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./components/GoogleLoginButton";
import ZodForm from "@/app/components/forms/ZodForm";
import useZodForm from "@/app/hooks/useZodForm";
import LoginSchema, { LoginType } from "@/app/formSchemas/LoginSchema";

const LoginForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    register,
    isLoading,
    setIsLoading,
    handleSubmit,
    isError,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useZodForm<LoginType>({
    zodSchema: LoginSchema,
    pushFormDataEndpoint: "",
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Nieprawidłowe dane!");
          setIsLoading(false);
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Zostałeś zalogowany!");
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił nieoczekiwany błąd!");
        setIsLoading(false);
      });
  };

  const newZodFormComponentProps = {
    isLoading,
    isError,
    handleSubmit,
    onSubmit,
    register,
    errors,
    setValue,
    watch,
    reset,
  };

  return (
    <>
      <ZodForm {...newZodFormComponentProps}>
        <Input id="login" placeholder="Podaj nick lub email" />
        <Input type="password" id="password" placeholder="Hasło" />
        <Button type="submit">Zaloguj się</Button>
      </ZodForm>
      {children}
      <FacebookLoginButton disabled={isLoading} setIsLoading={setIsLoading} />
      <GoogleLoginButton disabled={isLoading} setIsLoading={setIsLoading} />
    </>
  );
};

export default LoginForm;
