"use client";

import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaQuoteRight } from "@react-icons/all-files/fa/FaQuoteRight";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaChartBar } from "@react-icons/all-files/fa/FaChartBar";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";

import React, { useRef, useState } from "react";
import EditorButton from "./components/EditorButton";
import Form from "@/components/forms/ZodForm";
import useZodForm from "@/hooks/useZodForm";
import BlogPostSchema from "@/validators/BlogPostSchema";
import LabelCheckbox from "./components/LabelCheckbox";
import Button from "./components/Button";
import { FieldValue, FieldValues, useFieldArray } from "react-hook-form";
import { z } from "zod";
import ErrorInfo from "./components/ErrorInfo";
import Textarea from "./components/Textarea";

const AddBlogForm = () => {
  const formHook = useZodForm({
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
    control: formHook.control,
    name: "files",
  });
  const [unRolled, setUnrolled] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const filesRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = formHook.handleSubmit((data) => {});

  const errors = (
    Object.keys(formHook.formState.errors) as FieldValue<FieldValues>[]
  )
    .map(
      (field: keyof z.infer<typeof BlogPostSchema>) =>
        formHook.formState.errors?.[field]?.message
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          append({ value: reader.result as string });
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      });
    }
  };

  const handleDeleteImage = (index: number, id: string) => {
    if (messageRef.current) {
      remove(index);
      messageRef.current.value = messageRef.current.value.replaceAll(
        `[image hash=${id}]`,
        ""
      );
    }
  };

  const handleAddImageToTextarea = (id: string) => {
    if (messageRef.current) {
      messageRef.current.value += `[image hash=${id}]`;
    }
  };

  return (
    <>
      <Form
        className="my-[25px] relative"
        formHook={formHook}
        onSubmit={onSubmit}
      >
        <div className="block w-full max-h-full transition-all ease-in-out">
          <div>
            <div className="relative">
              <div className="relative">
                <Textarea
                  placeholder="Dodaj nowy wpis..."
                  onFocus={() => setUnrolled(true)}
                  isActive={unRolled}
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
                      <EditorButton icon={FaChartBar} title="Ankieta" />
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
      </Form>
      <ul className="m-[0_0_8px] w-full flex">
        {files.map((file, i) => (
          <li className="w-[calc(100%_/_5_-_8px)] m-1 leading-[0] h-full relative border-2 border-[#6e7578] rounded-[5px]">
            <img
              onClick={() => handleAddImageToTextarea(file.id)}
              key={file.id}
              src={file.value}
              alt={`Obraz ${i + 1}`}
              className="w-full cursor-pointer"
            />
            <button
              onClick={() => handleDeleteImage(i, file.id)}
              className="absolute bottom-0 right-0 bg-[#e01d1d] w-[23px] h-[23px] text-center flex items-center justify-center"
            >
              <FaTrash size={15} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddBlogForm;
