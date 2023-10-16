"use client";

import useZodForm from "@/hooks/useZodForm";
import Heading from "../../components/Heading";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import ChangePasswordSchema, {
  ChangePasswordType,
} from "@/validators/UserSettings/ChangePasswordSchema";
import ZodForm from "@/app/components/forms/ZodForm";

const ChangePasswordForm = () => {
  const { zodFormComponentProps, isLoading } = useZodForm<ChangePasswordType>({
    zodSchema: ChangePasswordSchema,
    pushFormDataEndpoint: "/api/user/settings/password",
    clearFormAfterChange: true,
    refreshPageAfterSuccessSubmit: false,
  });

  return (
    <>
      <Heading>Zmiana hasła</Heading>
      <ZodForm {...zodFormComponentProps}>
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
