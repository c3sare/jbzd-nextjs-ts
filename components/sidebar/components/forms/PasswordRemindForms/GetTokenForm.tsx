import ZodForm from "@/components/forms/ZodForm";
import GetTokenSchema from "@/validators/Sidebar/PasswordRemind/GetTokenSchema";
import useZodForm from "@/hooks/useZodForm";
import { Dispatch, SetStateAction } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";

type GetTokenFormProps = {
  setNextStep: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
};

const GetTokenForm: React.FC<GetTokenFormProps> = ({
  setNextStep,
  setEmail,
}) => {
  const formHook = useZodForm({
    schema: GetTokenSchema,
  });

  const { handleSubmit, setIsLoading } = formHook;

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    axios
      .post("/api/user/password/remind", data)
      .then((res) => res.data)
      .then((data) => {
        toast.success("Token został wysłany na wybrany adres e-mail.");
        setEmail(data.email || "");
        setNextStep();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił błąd!");
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <ZodForm formHook={formHook} onSubmit={onSubmit}>
      <Input placeholder="Adres email" id="email" />
      <Button type="submit">Wyślij link resetujący hasło</Button>
    </ZodForm>
  );
};

export default GetTokenForm;
