"use client";

import useZodForm from "@/hooks/useZodForm";
import Heading from "../../components/Heading";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ChangePasswordSchema from "@/validators/UserSettings/ChangePasswordSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { FormProvider } from "react-hook-form";

const ChangePasswordForm = () => {
  const form = useZodForm({
    schema: ChangePasswordSchema,
  });

  const { handleSubmit, reset } = form;

  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/user/settings/password", data)
      .then((res) => res.data)
      .then(() => {
        reset();
        toast.success("Pomyślnie zmieniono hasło!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      });
  });

  return (
    <FormProvider {...form}>
      <Heading>Zmiana hasła</Heading>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Aktualne hasło"
          type="password"
          id="currentPassword"
        />
        <Input placeholder="Nowe hasło" type="password" id="newPassword" />
        <Input
          placeholder="Powtórz nowe hasło"
          type="password"
          id="reNewPassword"
        />
        <Button type="submit">Zmień hasło</Button>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
