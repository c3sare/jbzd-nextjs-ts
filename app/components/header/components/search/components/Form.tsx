"use client";

import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import SearchSubmitButton from "./SearchSubmitButton";
import SearchInput from "./SearchInput";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SelectRadio from "./SelectRadio";

const dataTypes = ["wszystko", "obrazki", "tagi", "uzytkownicy"];

const Form = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: async () => {
      const search = searchParams.get("pharse") || "";
      const datatype = dataTypes.includes(params.datatype as string)
        ? params.datatype
        : "wszystko";

      return {
        search,
        datatype,
      };
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    router.push(`/wyszukaj/${data.datatype}?pharse=${encodeURI(data.search)}`);
  };

  const dataTypeValues = [
    {
      label: "Wszystko",
      value: "wszystko",
      default: true,
    },
    {
      label: "Obrazki",
      value: "obrazki",
    },
    {
      label: "Tagi",
      value: "tagi",
    },
    {
      label: "Użytkownicy",
      value: "uzytkownicy",
    },
  ];

  return (
    <form
      className="max-w-[1106px] mx-auto grid h-full w-full items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row self-end">
        <SearchInput
          register={register}
          id="search"
          label="Wyszukaj"
          errors={errors}
          required
        />
        <SearchSubmitButton />
      </div>
      <SelectRadio
        values={dataTypeValues}
        name="datatype"
        register={register}
      />
    </form>
  );
};

export default Form;
