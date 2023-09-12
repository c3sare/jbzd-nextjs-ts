"use client";

import Image from "next/image";
import { IoSend } from "@react-icons/all-files/io5/IoSend";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Textarea from "./Textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";

type AddCommentFormProps = {
  avatar: string;
  postId: string;
  commentId?: string;
  defaultValue?: string;
};

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  avatar,
  postId,
  commentId,
  defaultValue,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, setFocus } = useForm({
    defaultValues: {
      text: defaultValue,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/post/${postId}/comment`, {
        ...data,
        commentId,
      })
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reset({ text: "" });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex p-5 flex-wrap relative bg-[#313131] md:m-[15px_0_10px_0] items-start"
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,_0,_0)] flex items-center justify-center">
          <BiLoaderAlt className="animate-spin text-[36px] mx-auto" />
        </div>
      )}
      <Image
        className="mr-[2px] hidden sm:block"
        width={40}
        height={40}
        src={avatar}
        alt="Avatar"
      />
      <Textarea id="text" register={register} defaultValue="" />
      <button
        type="submit"
        className="w-[52px] ml-[2px] rounded-[3px] flex items-center justify-center h-[40px] text-white border-none cursor-pointer bg-[#777] outline-none"
      >
        <IoSend size={28} />
      </button>
    </form>
  );
};

export default AddCommentForm;
