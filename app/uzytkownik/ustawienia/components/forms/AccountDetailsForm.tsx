import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import Select from "@/app/components/forms/Select";
import InputDate from "@/app/components/sidebar/components/forms/components/InputDate";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import AccountDetailsSchema from "@/app/formSchemas/AccountDetailsSchema";
import LoadingBox from "@/app/components/LoadingBox";

const AccountDetailsForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getDefaultFormValues = async () => {
    if (!isLoading) setIsLoading(true);
    if (error) setError(false);

    const data = await axios.get("/api/user/settings/data");
    if (data.status === 200) {
      setIsLoading(false);
      return data.data;
    } else {
      toast.error("Wystąpił problem przy pobieraniu danych!");
      setIsLoading(false);
      setError(true);
      return {};
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues: getDefaultFormValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user/settings/data", data)
      .then((data) => {
        if (data.status === 200) {
          toast.success("Dane zostały zaaktualizowane!");
        } else {
          toast.error("Wystąpił nieoczekiwany błąd!");
        }
      })
      .catch((err) => {
        toast.error("Wystąpił nieoczekiwany błąd!");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <h3 className="font-bold text-[16px] my-4">Dane konta</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <Input
          id="name"
          register={register}
          errors={errors}
          placeholder="Imię"
          disabled={isLoading}
        />
        <Select
          id="gender"
          register={register}
          disabled={isLoading}
          valueAsNumber
        >
          <option value={0}>Mężczyzna</option>
          <option value={1}>Kobieta</option>
          <option value={2}>Inna</option>
          <option value={3}>Śmigłowiec szturmowy apache</option>
        </Select>
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
        <Button disabled={isLoading} type="submit">
          Zapisz
        </Button>
        {isLoading && <LoadingBox />}
      </form>
    </>
  );
};

export default AccountDetailsForm;
