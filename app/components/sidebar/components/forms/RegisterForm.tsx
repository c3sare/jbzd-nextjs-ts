"use client";

import Input from "@/app/components/Input";
import Button from "../../../Button";
import Checkbox from "@/app/components/Checkbox";
import Link from "next/link";
import ZodForm from "@/app/components/forms/ZodForm";
import useZodForm from "@/app/hooks/useZodForm";
import RegisterSchema, { RegisterType } from "@/app/formSchemas/RegisterSchema";
import { Dispatch, SetStateAction } from "react";

type RegisterFormProps = {
  children?: React.ReactNode;
  setIndexOfCurrentForm: Dispatch<SetStateAction<number>>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  children,
  setIndexOfCurrentForm,
}) => {
  const { zodFormComponentProps } = useZodForm<RegisterType>({
    pushFormDataEndpoint: "/api/register",
    zodSchema: RegisterSchema,
    customSuccessMessage: "Konto zostało założone prawidłowo!",
    successDataFetchCallback: () => setIndexOfCurrentForm(0),
  });

  return (
    <>
      <ZodForm {...zodFormComponentProps}>
        <Input id="username" placeholder="Nazwa użytkownika" />
        <Input id="email" placeholder="Email" />
        <Input id="password" type="password" placeholder="Hasło" />
        <Input id="repassword" type="password" placeholder="Powtórz hasło" />
        <Checkbox id="rules" required>
          Akceptuję <Link href="/regulamin">regulamin</Link>
        </Checkbox>
        <Button type="submit">Zarejestruj</Button>
      </ZodForm>
      {children}
    </>
  );
};

export default RegisterForm;
