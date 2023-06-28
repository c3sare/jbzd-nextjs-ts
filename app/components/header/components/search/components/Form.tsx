"use client";

import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import SearchSubmitButton from "./SearchSubmitButton";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";
import InputRadio from "./InputRadio";

type FormProps = {
  closeForm: () => void;
};

const Form: React.FC<FormProps> = ({ closeForm }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
      datatype: "wszystko",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    router.push(`/wyszukaj/${data.datatype}?pharse=${encodeURI(data.search)}`);
  };

  return (
    <form
      className="max-w-[1106px] mx-auto grid h-full items-center"
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
      <div className="flex flex-row">
        <InputRadio
          register={register}
          label="Wszystkie"
          id="datatype"
          value="wszystko"
          defaultChecked
        />
        <InputRadio
          register={register}
          label="Obrazki"
          id="datatype"
          value="obrazki"
        />
        <InputRadio
          register={register}
          label="Tagi"
          id="datatype"
          value="tagi"
        />
        <InputRadio
          register={register}
          label="Użytkownicy"
          id="datatype"
          value="uzytkownicy"
        />
      </div>
    </form>
  );
};

export default Form;
