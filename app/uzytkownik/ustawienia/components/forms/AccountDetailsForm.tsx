import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import Select from "@/app/components/forms/Select";

const AccountDetailsForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/")
      .then((data) => {
        toast.success("Dane zostały zaaktualizowane!");
      })
      .catch((err) => {
        toast.error("Wystąpił nieoczekiwany błąd!");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const genderValues = [
    {
      label: "Mężczyzna",
      value: 0,
    },
    {
      label: "Kobieta",
      value: 1,
    },
    {
      label: "Inna",
      value: 2,
    },
    {
      label: "Śmigłowiec szturmowy apache",
      value: 3,
    },
  ];

  return (
    <>
      <h3 className="font-bold text-[16px] my-4">Dane konta</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          register={register}
          errors={errors}
          placeholder="Imię"
          disabled={isLoading}
        />
        <Select
          id="gender"
          options={genderValues}
          register={register}
          disabled={isLoading}
        />
        <Input
          id="country"
          register={register}
          errors={errors}
          placeholder="Kraj"
          disabled={isLoading}
        />
        <Input
          id="city"
          register={register}
          errors={errors}
          placeholder="Miasto"
          disabled={isLoading}
        />
      </form>
    </>
  );
};

export default AccountDetailsForm;
