"use client";

import useZodForm from "@/hooks/useZodForm";
import Heading from "../../components/Heading";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ChangePasswordSchema from "@/validators/UserSettings/ChangePasswordSchema";
import ZodForm from "@/components/forms/ZodForm";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const formHook = useZodForm({
    schema: ChangePasswordSchema,
  });

  const { handleSubmit, setIsLoading, reset } = formHook;

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
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
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <>
      <Heading>Zmiana hasła</Heading>
      <ZodForm formHook={formHook} onSubmit={onSubmit}>
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
      </ZodForm>
    </>
  );
};

export default ChangePasswordForm;
