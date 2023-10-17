import ZodForm from "@/components/forms/ZodForm";
import GetTokenSchema, {
  GetTokenType,
} from "@/validators/Sidebar/PasswordRemind/GetTokenSchema";
import useZodForm from "@/hooks/useZodForm";
import { Dispatch, SetStateAction } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

type GetTokenFormProps = {
  setNextStep: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
};

const GetTokenForm: React.FC<GetTokenFormProps> = ({
  setNextStep,
  setEmail,
}) => {
  const { zodFormComponentProps } = useZodForm<GetTokenType>({
    zodSchema: GetTokenSchema,
    pushFormDataEndpoint: "/api/user/password/remind",
    successDataFetchCallback: (data) => {
      setEmail(data?.data.email || "");
      setNextStep();
    },
    customSuccessMessage: "Token został wysłany na wybrany adres e-mail.",
  });

  return (
    <ZodForm {...zodFormComponentProps}>
      <Input placeholder="Adres email" id="email" />
      <Button type="submit">Wyślij link resetujący hasło</Button>
    </ZodForm>
  );
};

export default GetTokenForm;
