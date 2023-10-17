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

type AccountDetailsFormProps = {
  userData: AccountDetailsType;
};

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  userData,
}) => {
  const { zodFormComponentProps, isLoading } = useZodForm<AccountDetailsType>({
    // initialFormDataEndpoint: "/api/user/settings/data",
    zodSchema: AccountDetailsSchema,
    pushFormDataEndpoint: "/api/user/settings/data",
    pushFormDataMethod: "POST",
    defaultFormValues: userData,
  });

  return (
    <>
      <Heading>Dane konta</Heading>
      <ZodForm {...zodFormComponentProps}>
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