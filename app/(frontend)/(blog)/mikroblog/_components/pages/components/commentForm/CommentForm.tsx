/* eslint-disable @next/next/no-img-element */

import { v4 as uuid } from "uuid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CommentTextarea from "./_componenets/CommentTextarea";

import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";

import useZodForm from "@/hooks/useZodForm";

import BlogCommentSchema from "@/validators/BlogCommentSchema";
import EditorButton from "../../../layout/blogForm/components/EditorButton";
import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaQuoteRight } from "@react-icons/all-files/fa/FaQuoteRight";
import { FormProvider, useFieldArray } from "react-hook-form";
import axios from "axios";
import objectToFormData from "@/utils/objectToFormData";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  onClose: () => void;
  defaultCommentText: string;
  postId: string;
};

const CommentForm: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  CommentFormProps
> = ({ onClose, defaultCommentText, postId }, ref) => {
  const router = useRouter();
  const form = useZodForm({
    schema: BlogCommentSchema,
    defaultValues: {
      message: defaultCommentText,
    },
  });
  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "files",
  });

  const [isActive, setIsActive] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const session = useSession();

  useImperativeHandle<HTMLTextAreaElement, any>(
    ref,
    () => {
      return {
        focus() {
          messageRef.current!.focus();
        },
        getCurrentValue: () => messageRef.current?.value || "",
        setValue: (value: string) => {
          messageRef.current!.value = value;
        },
      };
    },
    []
  );

  useEffect(() => {
    if (messageRef.current) messageRef.current.focus();
  }, [messageRef]);

  const handleSetTextFormat = (
    e: React.MouseEvent<HTMLButtonElement>,
    start: string,
    end: string
  ) => {
    e.preventDefault();
    if (messageRef.current) {
      const { value, selectionStart, selectionEnd } = messageRef.current;

      if (selectionStart === selectionEnd) return;

      const text = value.slice(selectionStart, selectionEnd);

      const textBefore = value.slice(0, selectionStart);
      const textAfter = value.slice(selectionEnd);

      const textWithFormat = start + text + end;

      messageRef.current.value = textBefore + textWithFormat + textAfter;
    }
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        if (file.type.indexOf("image") === 0) {
          append({ value: file, type: "IMAGE", uuid: uuid() });
        }
      });
    }
  };

  const resetForm = () => {
    form.reset({ message: "", files: [] });
  };

  const onSubmit = form.handleSubmit((data) => {
    const formData = objectToFormData(data);
    axios
      .put(`/api/blog/post/${postId}`, formData)
      .then((res) => res.data)
      .then((data) => {
        resetForm();
        router.refresh();
      })
      .catch((err) => {
        toast.error("Wystąpił błąd!");
        console.log(err);
      });
  });

  return (
    <FormProvider {...form}>
      <form
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
        <div className="float-left relative w-full md:w-[calc(100%_-_45px)] max-h-full transition-all ease-in-out block overflow-hidden">
          <CommentTextarea
            placeholder="Dodaj nowy wpis..."
            id="message"
            ref={messageRef}
            isActive={isActive}
            onFocus={() => setIsActive(true)}
          />
          {isActive && (
            <div className="w-[calc(100%_-_5px)] ml-[5px] relative mb-[65px] left-0 bottom-0 bg-black p-[10px]">
              <ul className="block w-full text-left">
                <EditorButton
                  onClick={(e) => handleSetTextFormat(e, "***", "***")}
                  icon={FaBold}
                  title="Pogrubienie"
                />
                <EditorButton
                  onClick={(e) => handleSetTextFormat(e, "__", "__")}
                  icon={FaItalic}
                  title="Pochylenie"
                />
                <EditorButton
                  onClick={(e) => handleSetTextFormat(e, "```\n", "\n```")}
                  icon={FaQuoteRight}
                  title="Cytat"
                />
              </ul>
            </div>
          )}
        </div>
        <ul className="flex relative top-2 left-[5px] mb-2 md:ml-[30px]">
          {files.map((file, i) => (
            <li
              key={file.id}
              className="w-[50px] h-[50px] m-1 leading-0 relative border-2 border-[#6e7578] rounded-[5px] overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file.value)}
                width={50}
                height={50}
                alt={`Grafika ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute bottom-0 right-0 bg-[#e01d1d] w-[23px] h-[23px] text-center flex items-center justify-center"
              >
                <FaTrash size={15} />
              </button>
            </li>
          ))}
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
              accept="image/png, image/jpg, image/gif"
              multiple
              ref={fileInputRef}
              onChange={handleAddFile}
              className="w-[100px] hidden relative z-[9] cursor-pointer h-[30px] ml-[5px] leading-[48px] bg-black p-[10px] text-white text-[16px]"
            />
            <button
              type="button"
              className="absolute right-[7px] bg-[#6e7578] w-[105px] left-0 p-0 top-0 leading-[33px] h-[33px] inline-block text-center text-[11px] font-semibold text-white transition-all duration-200"
            >
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
        {form.formState.isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_.5)] flex items-center justify-center">
            <BiLoaderAlt size={60} className="animate-spin text-zinc-400" />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default forwardRef(CommentForm);
