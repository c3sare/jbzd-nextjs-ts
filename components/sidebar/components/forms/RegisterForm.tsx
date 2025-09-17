"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";
import useZodForm from "@/hooks/useZodForm";
import RegisterSchema from "@/validators/Sidebar/RegisterSchema";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FormProvider } from "react-hook-form";

type RegisterFormProps = {
  children?: React.ReactNode;
  setIndexOfCurrentForm: Dispatch<SetStateAction<number>>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  children,
  setIndexOfCurrentForm,
}) => {
  const form = useZodForm({
    schema: RegisterSchema,
  });
  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/register", data)
      .then((res) => res.data)
      .then(() => {
        toast.success("Konto zostało założone prawidłowo!");
        setIndexOfCurrentForm(0);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Input id="username" placeholder="Nazwa użytkownika" />
        <Input id="email" placeholder="Email" />
        <Input id="password" type="password" placeholder="Hasło" />
        <Input id="repassword" type="password" placeholder="Powtórz hasło" />
        <Checkbox id="rules">
          Akceptuję <Link href="/regulamin">regulamin</Link>
        </Checkbox>
        <Button type="submit">Zarejestruj</Button>
      </form>
      {children}
    </FormProvider>
  );
};

export default RegisterForm;
