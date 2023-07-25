import useZodForm from "@/app/hooks/useZodForm";
import Heading from "../Heading";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import ChangePasswordSchema, {
  ChangePasswordType,
} from "@/app/formSchemas/ChangePasswordSchema";

const ChangePasswordForm = () => {
  const { Form } = useZodForm<ChangePasswordType>({
    zodSchema: ChangePasswordSchema,
    pushFormDataEndpoint: "/api/user/password",
  });

  console.log("rerender");

  return (
    <>
      <Heading>Zmiana hasła</Heading>
      <Form>
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
      </Form>
    </>
  );
};

export default ChangePasswordForm;
