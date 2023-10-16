import ZodForm from "@/app/components/forms/ZodForm";
import PasswordResetSchema, {
  PasswordResetType,
} from "@/validators/Sidebar/PasswordRemind/PasswordResetSchema";
import useZodForm from "@/hooks/useZodForm";
import { Dispatch, SetStateAction } from "react";
import Input from "@/app/components/Input";
import Button from "../../../../Button";

type PasswordResetForm = {
  setIndexOfCurrentForm: Dispatch<SetStateAction<number>>;
  email: string;
};

const PasswordResetForm: React.FC<PasswordResetForm> = ({
  setIndexOfCurrentForm,
  email,
}) => {
  const { zodFormComponentProps } = useZodForm<PasswordResetType>({
    zodSchema: PasswordResetSchema,
    pushFormDataEndpoint: "/api/user/password/change",
    successDataFetchCallback: () => {
      setIndexOfCurrentForm(0);
    },
    customSuccessMessage: "Hasło zostało pomyślnie zmienione!",
    defaultFormValues: {
      email,
    },
  });

  return (
    <ZodForm {...zodFormComponentProps}>
      <Input hidden id="email" />
      <Input id="token" placeholder="TOKEN" />
      <Input type="password" id="password" placeholder="Nowe Hasło" />
      <Input type="password" id="repassword" placeholder="Powtórz Nowe Hasło" />
      <Button type="submit">Zmień hasło</Button>
    </ZodForm>
  );
};

export default PasswordResetForm;
