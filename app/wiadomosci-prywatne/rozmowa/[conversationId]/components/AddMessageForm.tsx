"use client";

import { pusherClient } from "@/app/libs/pusher";
import { IoSendSharp } from "@react-icons/all-files/io5/IoSendSharp";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type AddMessageFormProps = {
  conversationId: string;
  isBlockedConversation: boolean;
};

const AddMessageForm: React.FC<AddMessageFormProps> = ({
  conversationId,
  isBlockedConversation: isBlocked,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });
  const [isBlockedConversation, setIsBlockedConversation] =
    useState<boolean>(isBlocked);

  useEffect(() => {
    const handleBlockConversation = ({
      conversationId: convId,
      userId,
    }: {
      conversationId: string;
      userId: string | null;
    }) => {
      if (conversationId === convId) setIsBlockedConversation(Boolean(userId));
    };

    pusherClient.bind("conversation:block", handleBlockConversation);

    return () => {
      pusherClient.unbind("conversation:block", handleBlockConversation);
    };
  }, [conversationId]);

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
        disabled={isLoading || isBlockedConversation}
        placeholder={
          isBlockedConversation
            ? "Wątek zablokowany, nie możesz pisać."
            : "Wpisz wiadomość..."
        }
        className="resize-none h-[58px] overflow-hidden w-full p-[10px] rounded-[5px] bg-[#1f1f1f] text-white mr-[10px] max-w-[calc(100%_-_57px_-_10px)] min-w-[calc(100%_-_57px_-_10px)] min-h-[40px] leading-normal outline-none placeholder:text-[grey] placeholder:italic"
        {...register("body")}
      />
      <button
        disabled={isLoading || isBlockedConversation}
        type="submit"
        className="flex items-center justify-center w-[57px] h-[57px] bg-[#c03e3e] rounded-[5px] text-white text-[24px] outline-none"
      >
        <IoSendSharp />
      </button>
    </form>
  );
};

export default AddMessageForm;
