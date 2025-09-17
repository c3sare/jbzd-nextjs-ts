"use client";

/* eslint-disable @next/next/no-img-element */

import { v4 as uuid } from "uuid";
import React, { useRef, useState } from "react";
import {
  FieldValue,
  FieldValues,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";

import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaQuoteRight } from "@react-icons/all-files/fa/FaQuoteRight";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaChartBar } from "@react-icons/all-files/fa/FaChartBar";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import { ImCross } from "@react-icons/all-files/im/ImCross";

import objectToFormData from "@/utils/objectToFormData";
import QuestionnaireSchema from "@/validators/QuestionnaireSchema";
import BlogPostSchema from "@/validators/BlogPostSchema";

import EditorButton from "./components/EditorButton";
import useZodForm from "@/hooks/useZodForm";
import LabelCheckbox from "./components/LabelCheckbox";
import Button from "./components/Button";
import ErrorInfo from "./components/ErrorInfo";
import QuestionnaireForm from "./components/questionnaire/QuestionnaireForm";
import BlogPostTextarea from "./components/BlogPostTextarea";
import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";
import { useRouter } from "next/navigation";

const AddBlogForm = () => {
  const router = useRouter();
  const [isVisibleQuestionnaire, setIsVisibleQuestionnaire] =
    useState<boolean>(false);
  const form = useZodForm({
    schema: BlogPostSchema,
    defaultValues: {
      adultContent: false,
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
  const [unRolled, setUnrolled] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const filesRef = useRef<HTMLInputElement | null>(null);

  const errors = (
    Object.keys(form.formState.errors) as FieldValue<FieldValues>[]
  )
    .map(
      (field: keyof z.infer<typeof BlogPostSchema>) =>
        form.formState.errors?.[field]?.message
    )
    .filter((item) => item);

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
        } else if (file.type.indexOf("video") === 0) {
          append({ value: file, type: "VIDEO", uuid: uuid() });
        }
      });
    }
  };

  const handleDeleteItem = (index: number, id: string) => {
    if (messageRef.current) {
      remove(index);
      messageRef.current.value = messageRef.current.value.replaceAll(
        `[image hash=${id}]`,
        ""
      );
      messageRef.current.value = messageRef.current.value.replaceAll(
        `[video hash=${id}]`,
        ""
      );
    }
  };

  const handleAddImageToTextarea = (id: string) => {
    if (messageRef.current) {
      messageRef.current.value += `[image hash=${id}]`;
    }
  };

  const handleAddVideoToTextarea = (id: string) => {
    if (messageRef.current) {
      messageRef.current.value += `[video hash=${id}]`;
    }
  };

  const resetForm = () =>
    form.reset({
      questionnaire: undefined,
      message: "",
      adultContent: false,
      files: [],
    });

  const onSubmit = form.handleSubmit((data) => {
    const formData = objectToFormData(data);
    axios
      .put("/api/blog", formData)
      .then((res) => res.data)
      .then(() => {
        resetForm();
        router.refresh();
        // router.push(`/mikroblog/${data.id}/${}`)
      })
      .catch((err) => {
        toast.error("Wystąpił błąd!");
        console.log(err);
      });
  });

  const setQuestionnaire = (data: z.infer<typeof QuestionnaireSchema>) => {
    form.setValue("questionnaire", data);
  };

  const questionnaire = form.watch("questionnaire");

  return (
    <div className="w-full relative">
      <FormProvider {...form}>
        <form className="my-[25px] relative" onSubmit={onSubmit}>
          <div className="block w-full max-h-full transition-all ease-in-out">
            <div>
              <div className="relative">
                <div className="relative">
                  <BlogPostTextarea
                    isActive={unRolled}
                    placeholder="Dodaj nowy wpis..."
                    onFocus={() => setUnrolled(true)}
                    id="message"
                    ref={messageRef}
                  />
                  {errors.map((error, i) => (
                    <ErrorInfo key={i}>{error}</ErrorInfo>
                  ))}
                  <input
                    className="hidden"
                    id="files"
                    type="file"
                    accept="image/png, image/jpg, image/gif, video/mp4"
                    multiple
                    ref={filesRef}
                    onChange={handleAddFile}
                  />
                  {unRolled && (
                    <div className="w-full relative mb-[10px] bg-black p-[10px]">
                      <ul className="flex items-center w-full text-left">
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
                          onClick={(e) =>
                            handleSetTextFormat(e, "```\n", "\n```")
                          }
                          icon={FaQuoteRight}
                          title="Cytat"
                        />
                        <EditorButton
                          onClick={() => {
                            if (filesRef.current) filesRef.current.click();
                          }}
                          icon={FaImage}
                          title="Dodaj obrazek/film"
                        />
                        <EditorButton
                          onClick={() => setIsVisibleQuestionnaire(true)}
                          icon={FaChartBar}
                          title="Ankieta"
                        />
                        <li className="inline-block float-right mr-[10px] ml-auto">
                          <LabelCheckbox label="+18" id="adultContent" />
                        </li>
                        <li className="inline-block float-right">
                          <Button type="submit">Opublikuj</Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      {isVisibleQuestionnaire && (
        <QuestionnaireForm
          setData={setQuestionnaire}
          currentFormValues={questionnaire}
          onClose={() => setIsVisibleQuestionnaire(false)}
        />
      )}
      {questionnaire && (
        <div className="mb-[8px] ml-[5px]">
          <div className="text-white bg-black inline-flex items-center justify-center p-[10px] gap-2 text-[12px]">
            Post z ankietą: {questionnaire.question}
            <button onClick={() => form.setValue("questionnaire", undefined)}>
              <ImCross />
            </button>
          </div>
        </div>
      )}
      <ul className="m-[0_0_8px] w-full flex">
        {files.map((file, i) => (
          <li
            key={i}
            className="cursor-pointer w-[130px] h-[130px] m-1 leading-[0] border-2 border-[#6e7578] rounded-[5px] relative"
          >
            {file.type === "IMAGE" && (
              <img
                onClick={() => handleAddImageToTextarea(file.uuid)}
                key={file.id}
                src={URL.createObjectURL(file.value as File)}
                alt={`Obraz ${i + 1}`}
                className="object-cover w-full h-full"
              />
            )}
            {file.type === "VIDEO" && (
              <span onClick={() => handleAddVideoToTextarea(file.uuid)}>
                <video
                  className="object-cover w-full h-full"
                  src={URL.createObjectURL(file.value as File)}
                />
                <FaPlay
                  size={32}
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </span>
            )}
            <button
              onClick={() => handleDeleteItem(i, file.id)}
              className="absolute bottom-0 right-0 bg-[#e01d1d] w-[23px] h-[23px] text-center flex items-center justify-center"
            >
              <FaTrash size={15} />
            </button>
          </li>
        ))}
      </ul>
      {form.formState.isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] flex items-center justify-center">
          <BiLoaderAlt size={60} className="animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  );
};

export default AddBlogForm;
