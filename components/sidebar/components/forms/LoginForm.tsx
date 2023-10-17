"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import FacebookLoginButton from "./components/FacebookLoginButton";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./components/GoogleLoginButton";
import ZodForm from "@/components/forms/ZodForm";
import useZodForm from "@/hooks/useZodForm";
import LoginSchema from "@/validators/Sidebar/LoginSchema";

const LoginForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const formHook = useZodForm({
    schema: LoginSchema,
  });
  const router = useRouter();

  const { setIsLoading, handleSubmit, isLoading } = formHook;

  const onSubmit = handleSubmit((data) => {
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
  });

  return (
    <>
      <ZodForm formHook={formHook} onSubmit={onSubmit}>
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
