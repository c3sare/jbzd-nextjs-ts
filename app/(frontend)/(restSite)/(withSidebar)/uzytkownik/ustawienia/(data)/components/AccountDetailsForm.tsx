"use client";

import Input from "@/components/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/Button";
import AccountDetailsSchema, {
  AccountDetailsType,
} from "@/validators/UserSettings/AccountDetailsSchema";
import useZodForm from "@/hooks/useZodForm";
import Heading from "../../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";

type AccountDetailsFormProps = {
  userData: AccountDetailsType;
};

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  userData,
}) => {
  const router = useRouter();
  const form = useZodForm({
    schema: AccountDetailsSchema,
    defaultValues: userData,
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/user/settings/data", data)
      .then((res) => res.data)
      .then(() => {
        toast.success("Pomyślnie zaakutalizowano!");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem!");
      });
  });

  return (
    <FormProvider {...form}>
      <Heading>Dane konta</Heading>
      <form onSubmit={onSubmit}>
        <Input id="name" placeholder="Imię" />
        <Select id="gender" valueAsNumber>
          <option value={0}>Mężczyzna</option>
          <option value={1}>Kobieta</option>
          <option value={2}>Inna</option>
          <option value={3}>Śmigłowiec szturmowy apache</option>
        </Select>
        <Input id="country" placeholder="Kraj" />
        <Input id="city" placeholder="Miasto" />
        <Input type="date" id="birthdate" placeholder="Data urodzenia" />
        <Button type="submit">Zapisz</Button>
      </form>
    </FormProvider>
  );
};

export default AccountDetailsForm;
