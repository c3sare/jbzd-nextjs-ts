"use client";

import Input from "@/app/components/sidebar/components/forms/components/Input";
import Select from "@/app/components/forms/Select";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import AccountDetailsSchema, {
  AccountDetailsType,
} from "@/app/formSchemas/AccountDetailsSchema";
import useZodForm from "@/app/hooks/useZodForm";
import Heading from "../../Heading";
import ZodForm from "@/app/components/forms/ZodForm";

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
