"use client";

import { IoSendSharp } from "@react-icons/all-files/io5/IoSendSharp";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type AddMessageFormProps = {
  conversationId: string;
};

const AddMessageForm: React.FC<AddMessageFormProps> = ({ conversationId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/conversation/${conversationId}/message`, data)
      .catch((err) => console.log(err))
      .finally(() => {
        reset();
        setIsLoading(false);
      });
  };

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        disabled={isLoading}
        placeholder="Wpisz wiadomość..."
        className="resize-none h-[58px] overflow-hidden w-full p-[10px] rounded-[5px] bg-[#1f1f1f] text-white mr-[10px] max-w-[calc(100%_-_57px_-_10px)] min-w-[calc(100%_-_57px_-_10px)] min-h-[40px] leading-normal outline-none placeholder:text-[grey] placeholder:italic"
        {...register("body")}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="flex items-center justify-center w-[57px] h-[57px] bg-[#c03e3e] rounded-[5px] text-white text-[24px] outline-none"
      >
        <IoSendSharp />
      </button>
    </form>
  );
};

export default AddMessageForm;
