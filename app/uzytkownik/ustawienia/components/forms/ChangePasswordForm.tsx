import useZodForm from "@/app/hooks/useZodForm";
import Heading from "../Heading";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import ChangePasswordSchema, {
  ChangePasswordType,
} from "@/app/formSchemas/ChangePasswordSchema";
import ZodForm from "@/app/components/forms/ZodForm";
import { useSession } from "next-auth/react";

const ChangePasswordForm = () => {
  const session = useSession();
  const { zodFormComponentProps } = useZodForm<ChangePasswordType>({
    zodSchema: ChangePasswordSchema,
    pushFormDataEndpoint: "/api/user/password",
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
