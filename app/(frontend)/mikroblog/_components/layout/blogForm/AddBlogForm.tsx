"use client";

import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaQuoteRight } from "@react-icons/all-files/fa/FaQuoteRight";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaChartBar } from "@react-icons/all-files/fa/FaChartBar";

import { useEffect, useRef, useState } from "react";
import EditorButton from "./components/EditorButton";
import Form from "@/components/forms/ZodForm";
import useZodForm from "@/hooks/useZodForm";
import BlogPostSchema from "@/validators/BlogPostSchema";
import LabelCheckbox from "./components/LabelCheckbox";
import Button from "./components/Button";
import { FieldValue, FieldValues } from "react-hook-form";
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
  const [unRolled, setUnrolled] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = formHook.handleSubmit((data) => {});

  const errors = (
    Object.keys(formHook.formState.errors) as FieldValue<FieldValues>[]
  )
    .map(
      (field: keyof z.infer<typeof BlogPostSchema>) =>
        formHook.formState.errors?.[field]?.message
    )
    .filter((item) => item);

  useEffect(() => {
    console.log(messageRef);
  }, [messageRef]);

  return (
    <Form
      className="mb-[25px] relative"
      formHook={formHook}
      onSubmit={onSubmit}
    >
      <div className="block w-full max-h-full transition-all ease-in-out">
        <div>
          <div className="relative">
            <div className="pt-[61px] relative">
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
              {unRolled && (
                <div className="w-full relative mb-[10px] bg-black p-[10px]">
                  <ul className="flex items-center w-full text-left">
                    <EditorButton icon={FaBold} title="Pogrubienie" />
                    <EditorButton icon={FaItalic} title="Pochylenie" />
                    <EditorButton icon={FaQuoteRight} title="Cytat" />
                    <EditorButton icon={FaImage} title="Dodaj obrazek/film" />
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
  );
};

export default AddBlogForm;
