"use client";

import Button from "@/app/components/sidebar/components/forms/components/Button";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const UsernameForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user/username", data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[350px] mx-auto">
      <Input
        errors={errors}
        required
        register={register}
        id="username"
        disabled={isLoading}
        placeholder="Wpisz nazwę użytkownika..."
      />
      <Button disabled={isLoading} type="submit">
        Zapisz nazwę użytkownika
      </Button>
    </form>
  );
};

export default UsernameForm;
