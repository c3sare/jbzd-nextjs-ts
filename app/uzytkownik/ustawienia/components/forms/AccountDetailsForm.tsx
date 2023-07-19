import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import Select from "@/app/components/forms/Select";
import InputDate from "@/app/components/sidebar/components/forms/components/InputDate";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import { parseISO } from "date-fns";

const AccountDetailsForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: async () => {
      setIsLoading(true);
      const data = await axios.get("/api/user/settings/data");
      if (data.status === 200) {
        setIsLoading(false);
        return {
          name: data.data?.name || "",
          gender: [0, 1, 2, 3].includes(Number(data.data?.gender))
            ? Number(data.data.gender)
            : 0,
          city: data.data?.city || "",
          country: data.data?.country || "",
          birthdate: data.data?.birthdate ? parseISO(data.data.birthdate) : "",
        };
      } else {
        toast.error("Wystąpił problem przy pobieraniu danych!");
        return {};
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user/settings/data", data)
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
          valueAsNumber
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
        <InputDate
          id="birthdate"
          register={register}
          errors={errors}
          placeholder="Data urodzenia"
          disabled={isLoading}
          watch={watch}
          setValue={setValue}
        />
        <Button type="submit">Zapisz</Button>
      </form>
    </>
  );
};

export default AccountDetailsForm;
