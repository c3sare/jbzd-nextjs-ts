"use client";

import Input from "@/components/Input";
import Select from "@/components/forms/Select";
import Button from "@/components/Button";
import AccountDetailsSchema, {
  AccountDetailsType,
} from "@/validators/UserSettings/AccountDetailsSchema";
import useZodForm from "@/hooks/useZodForm";
import Heading from "../../components/Heading";
import ZodForm from "@/components/forms/ZodForm";
import axios from "axios";
import toast from "react-hot-toast";

type AccountDetailsFormProps = {
  userData: AccountDetailsType;
};

const defaultValues: {
  [key: string]: any;
} = {};

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  userData,
}) => {
  const apiEndpoint = "/api/user/settings/data";
  const formHook = useZodForm({
    schema: AccountDetailsSchema,
    defaultValues: userData,
  });

  const { setIsLoading, handleSubmit } = formHook;

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    axios
      .post(apiEndpoint, data)
      .then((res) => res.data)
      .then((data) => {
        defaultValues[apiEndpoint] = data;
        toast.success("Pomyślnie zaakutalizowano!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem!");
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <>
      <Heading>Dane konta</Heading>
      <ZodForm formHook={formHook} onSubmit={onSubmit}>
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
      </ZodForm>
    </>
  );
};

export default AccountDetailsForm;
