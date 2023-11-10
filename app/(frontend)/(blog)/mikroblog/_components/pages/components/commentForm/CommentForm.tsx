/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useSession } from "next-auth/react";
import { forwardRef, useRef } from "react";
import CommentTextarea from "./_componenets/CommentTextarea";

import { FaTrash } from "@react-icons/all-files/fa/FaTrash";

import useZodForm from "@/hooks/useZodForm";

import Form from "@/components/forms/ZodForm";
import BlogCommentSchema from "@/validators/BlogCommentSchema";
import Textarea from "../../../layout/blogForm/components/Textarea";

type CommentFormProps = {
  onClose: () => void;
  defaultCommentText: string;
};

const CommentForm: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  CommentFormProps
> = ({ onClose, defaultCommentText }, ref) => {
  const formHook = useZodForm({
    schema: BlogCommentSchema,
    defaultValues: {
      message: defaultCommentText,
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const session = useSession();

  const onSubmit = formHook.handleSubmit((data) => {});

  return (
    <Form
      formHook={formHook}
      onSubmit={onSubmit}
      className="py-[20px] px-[15px] bg-[hsla(198,4%,45%,.3)] relative flex flex-wrap"
    >
      <span className="w-[30px] h-[30px] mr-[10px] rounded-full overflow-hidden relative hidden md:block">
        <Image
          src={session.data?.user?.image || "/images/avatars/default.jpg"}
          width={30}
          height={30}
          alt="Avatar"
        />
      </span>
      <CommentTextarea />
      <ul className="flex relative top-2 left-[5px] mb-2 md:ml-[30px]">
        <li className="w-[50px] h-[50px] m-1 leading-0 relative border-2 border-[#6e7578] rounded-[5px]">
          <img
            src="/images/avatars/default.jpg"
            width={50}
            height={50}
            alt="Grafika"
          />
          <button className="absolute bottom-0 right-0 bg-[#e01d1d] w-[23px] h-[23px] text-center flex items-center justify-center">
            <FaTrash size={15} />
          </button>
        </li>
      </ul>
      <div className="flex flex-wrap w-full md:flex-nowrap md:ml-[30px]">
        <div
          className="w-full md:w-[calc(100%_-_200px)] top-0 my-2 ml-[5px] h-[33px] bg-none leading-[33px] overflow-hidden relative clear-both cursor-pointer"
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
        >
          <p className="absolute left-[15px] text-[12px] text-left text-white indent-[105px] leading-[33px]">
            Dodaj zdjęcia ręcznie lub upuść je tutaj...
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="w-[100px] hidden relative z-[9] cursor-pointer h-[30px] ml-[5px] leading-[48px] bg-black p-[10px] text-white text-[16px]"
          />
          <button className="absolute right-[7px] bg-[#6e7578] w-[105px] left-0 p-0 top-0 leading-[33px] h-[33px] inline-block text-center text-[11px] font-semibold text-white transition-all duration-200">
            Wybierz plik
          </button>
        </div>
        <div className="w-[200px] ml-auto flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="block leading-[33px] mt-2 mr-[10px] text-[#8a8989]"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="block leading-[33px] h-[33px] ml-[5px] mt-2 transition-colors duration-200 px-[25px] text-center text-[11px] bg-[#c23d3a] font-semibold text-white"
          >
            Opublikuj
          </button>
        </div>
      </div>
    </Form>
  );
};

export default forwardRef(CommentForm);
