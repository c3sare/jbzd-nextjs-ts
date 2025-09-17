import PasswordResetSchema from "@/validators/Sidebar/PasswordRemind/PasswordResetSchema";
import useZodForm from "@/hooks/useZodForm";
import { Dispatch, SetStateAction } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { FormProvider } from "react-hook-form";

type PasswordResetForm = {
  setIndexOfCurrentForm: Dispatch<SetStateAction<number>>;
  email: string;
};

const PasswordResetForm: React.FC<PasswordResetForm> = ({
  setIndexOfCurrentForm,
  email,
}) => {
  const form = useZodForm({
    schema: PasswordResetSchema,
    defaultValues: {
      email,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/user/password/change", data)
      .then((res) => res.data)
      .then(() => {
        toast.success("Hasło zostało pomyślnie zmienione!");
        setIndexOfCurrentForm(0);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem przy zmianie hasła!");
      });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Input hidden id="email" />
        <Input id="token" placeholder="TOKEN" />
        <Input type="password" id="password" placeholder="Nowe Hasło" />
        <Input
          type="password"
          id="repassword"
          placeholder="Powtórz Nowe Hasło"
        />
        <Button type="submit">Zmień hasło</Button>
      </form>
    </FormProvider>
  );
};

export default PasswordResetForm;
