"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./components/Input";
import Button from "./components/Button";
import FacebookLoginButton from "./components/FacebookLoginButton";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./components/GoogleLoginButton";

const LoginForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
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
        setIsLoading(false);
      });
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
      <FacebookLoginButton disabled={isLoading} setIsLoading={setIsLoading} />
      <GoogleLoginButton disabled={isLoading} setIsLoading={setIsLoading} />
    </>
  );
};

export default LoginForm;
