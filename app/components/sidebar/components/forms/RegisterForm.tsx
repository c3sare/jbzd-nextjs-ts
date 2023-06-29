"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./components/Input";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Link from "next/link";
import { toast } from "react-hot-toast";

const RegisterForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repassword: "",
      rules: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/registerr", data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      })
      .finally(() => setIsLoading(false));
  };

  const inputDefaultProps = {
    register,
    errors,
    disabled: isLoading,
    required: true,
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...inputDefaultProps}
          id="username"
          placeholder="Nazwa użytkownika"
        />
        <Input {...inputDefaultProps} id="email" placeholder="Email" />
        <Input
          {...inputDefaultProps}
          id="password"
          type="password"
          placeholder="Hasło"
        />
        <Input
          {...inputDefaultProps}
          id="repassword"
          type="password"
          placeholder="Powtórz hasło"
        />
        <Checkbox
          id="rules"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        >
          Akceptuję <Link href="/regulamin">regulamin</Link>
        </Checkbox>
        <Button disabled={isLoading} type="submit">
          Zarejestruj
        </Button>
      </form>
      {children}
    </>
  );
};

export default RegisterForm;
