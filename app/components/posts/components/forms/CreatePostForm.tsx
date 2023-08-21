"use client";

import type { Category as CategoryType } from "@prisma/client";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { FormEvent, KeyboardEvent } from "react";
import type { CreatePostType } from "@/app/formSchemas/CreatePostSchema";

import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFieldArray, useForm } from "react-hook-form";
import React, { useMemo, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { BiImage } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { AiFillFileText, AiFillYoutube } from "react-icons/ai";

import BigIconButton from "@/app/components/BigIconButton";
import InputStyled from "@/app/components/InputStyled";
import TextSwitchButton from "@/app/components/TextSwitchButton";
import Button from "@/app/components/Button";
import MemImage from "./FormPostElements/MemImage";
import MemVideo from "./FormPostElements/MemVideo";
import MemText from "./FormPostElements/MemText";
import MemYoutube from "./FormPostElements/MemYoutube";
import InputLinkPreview from "./CreatePostFormComponents/InputLinkPreview";
import ErrorMessageBox from "./CreatePostFormComponents/ErrorMessageBox";
import MemContainer from "./CreatePostFormComponents/MemContainer";
import CreatePostSchema from "@/app/formSchemas/CreatePostSchema";

import Header from "./Header";
import Information from "./Information";
import Category from "./Category";
import Tag from "./Tag";
import axios from "axios";
import objectToFormData from "@/utils/objectToFormData";

type CategoryWithChildrenType = CategoryType & {
  children: CategoryType[];
};

type CreatePostFormProps = {
  onClose: () => void;
  categories: CategoryWithChildrenType[];
};

const memElements = {
  IMAGE: MemImage,
  VIDEO: MemVideo,
  TEXT: MemText,
  YOUTUBE: MemYoutube,
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onClose,
  categories,
}) => {
  const tagInput = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
    handleSubmit,
    getValues,
  } = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema),
    mode: "all",
    shouldUnregister: true,
    defaultValues: {
      title: "",
      category: "",
      memContainers: [],
      tags: [],
      isActiveLinking: false,
    },
  });
  const {
    fields: memContainers,
    append: appendMem,
    remove: removeMem,
    move: moveMem,
  } = useFieldArray({
    name: "memContainers",
    control,
  });
  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    name: "tags",
    control,
  });

  const onChangeTagInput = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replaceAll(",", "");
  };

  const onPressKeyTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Tab", ","].includes(e.key)) {
      e.preventDefault();
      if (
        !tags.filter((tag: any) => tag.value === e.currentTarget.value)
          .length &&
        tags.length < 10 &&
        e.currentTarget.value
      ) {
        appendTag({ value: e.currentTarget.value });
        e.currentTarget.value = "";
      }
    }
  };

  const handleAddMemContainer = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: CreatePostType["memContainers"][0]["type"]
  ) => {
    e.preventDefault();
    switch (type) {
      case "IMAGE": {
        appendMem({
          type,
          data: null,
        });
        break;
      }
      case "VIDEO": {
        appendMem({
          type,
          data: null,
        });
        break;
      }
      case "TEXT": {
        appendMem({
          type,
          data: "",
        });
        break;
      }
      case "YOUTUBE": {
        appendMem({
          type,
          data: "",
        });
      }
    }
  };

  const isActiveLinking = watch("isActiveLinking");
  const currentCategory = watch("category");

  const category = useMemo(
    () =>
      categories.find(
        (item) =>
          item.slug === currentCategory ||
          item.children.filter((subitem) => subitem.slug === currentCategory)
            .length > 0
      ),
    [currentCategory, categories]
  );

  const onSubmit = (data: CreatePostType) => {
    axios
      .post("/api/post", objectToFormData(data))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="my-[20px] bg-[#313131] p-[10px] relative text-left"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full mb-[20px]">
        <Header>Wpisz tytuł</Header>
        <InputStyled
          placeholder="Wpisz tytuł"
          {...register("title")}
          id="title"
        />
        {errors.title && (
          <ErrorMessageBox>{errors.title.message}</ErrorMessageBox>
        )}
      </div>
      <DndProvider backend={HTML5Backend}>
        {memContainers.map((mem, index) => {
          const MemElement = memElements[mem.type] as React.FC<any>;

          return (
            <MemContainer
              key={mem.id}
              handleRemoveMem={() => removeMem(index)}
              move={moveMem}
              index={index}
              id={mem.id}
            >
              <MemElement
                control={control}
                fieldName={`memContainers.${index}.data`}
                setData={(data: any) =>
                  setValue(`memContainers.${index}.data`, data)
                }
              />
              {errors.memContainers?.[index]?.message && (
                <ErrorMessageBox>
                  {errors.memContainers?.[index]?.message}
                </ErrorMessageBox>
              )}
            </MemContainer>
          );
        })}
      </DndProvider>
      <div className="w-full mb-[20px]">
        <Header>
          {memContainers.length > 0
            ? "Czy chcesz dodać coś jeszcze?"
            : "Co chcesz dodać?"}
        </Header>
        <div className="flex w-full gap-[5px] justify-between">
          <BigIconButton
            onClick={(e) => handleAddMemContainer(e, "IMAGE")}
            icon={<BiImage />}
          >
            Obrazek/Gif
          </BigIconButton>
          <BigIconButton
            onClick={(e) => handleAddMemContainer(e, "TEXT")}
            icon={<AiFillFileText />}
          >
            Tekst
          </BigIconButton>
          <BigIconButton
            onClick={(e) => handleAddMemContainer(e, "VIDEO")}
            icon={<FaVideo />}
          >
            Video MP4
          </BigIconButton>
          <BigIconButton
            onClick={(e) => handleAddMemContainer(e, "YOUTUBE")}
            icon={<AiFillYoutube />}
          >
            Youtube
          </BigIconButton>
        </div>
        {errors.memContainers && (
          <ErrorMessageBox>{errors.memContainers.message}</ErrorMessageBox>
        )}
      </div>
      <div className="w-full mb-[20px] relative">
        {categories.length > 0 && (
          <>
            <Header>
              <span>Dział:</span>
              {currentCategory && (
                <>
                  <span className="text-white p-[3px_9px] rounded-[3px] inline-block text-[12px] cursor-pointer bg-[#c03e3e] font-bold">
                    {category?.name}
                  </span>
                  <button
                    type="button"
                    className="text-[#6e7578] text-[11px] cursor-pointer"
                    onClick={() => setValue("category", "")}
                  >
                    wyczyść
                  </button>
                </>
              )}
            </Header>
            <div className={clsx(currentCategory && "hidden")}>
              <Information>
                Wybór działu jest obowiązkowy, subdział wybieramy tylko jeśli
                jest taka możliwość.
              </Information>
              <div className="flex gap-[5px] flex-wrap items-center">
                {categories.map((category) => (
                  <Category
                    key={category.id}
                    name={category.name}
                    fieldName="category"
                    slug={category.slug}
                    register={register}
                    watch={watch}
                  />
                ))}
              </div>
            </div>
            {currentCategory &&
              category?.children &&
              category.children.length > 0 && (
                <div className="flex gap-[5px] flex-wrap items-center">
                  <span>Poddział: </span>
                  {category.children.map((category) => (
                    <Category
                      key={category.id}
                      name={category.name}
                      fieldName="category"
                      slug={category.slug}
                      register={register}
                      watch={watch}
                    />
                  ))}
                </div>
              )}
            <Information>
              Poddział dodajemy jeśli jest taka możliwość
            </Information>
          </>
        )}
        {errors.category && (
          <ErrorMessageBox>{errors.category.message}</ErrorMessageBox>
        )}
      </div>
      <div className="w-full mb-[20px]">
        <Header>Dodaj tagi</Header>
        <Information>Aby dodać kolejny tag należy dodać przecinek.</Information>
        <div className="w-full">
          <InputStyled
            ref={tagInput}
            placeholder="Wpisz tagi ..."
            onChange={onChangeTagInput}
            onKeyDown={onPressKeyTagInput}
          />
        </div>
        {tags.length > 0 && (
          <ul className="flex items-center flex-wrap w-full leading-[1em] m-0 p-0 list-none pt-[8px]">
            {tags.map((tag, i) => {
              const { name: fieldName } = register(`tags.${i}.value`);

              return (
                <Tag
                  key={tag.id}
                  name={tag.value}
                  onDelete={() => removeTag(i)}
                  fieldName={fieldName}
                />
              );
            })}
          </ul>
        )}
      </div>
      <div className="mb-[20px] relative">
        <TextSwitchButton
          text="Pokaż linkowanie"
          activeText="Schowaj linkowanie"
          watch={watch}
          register={register}
          id="isActiveLinking"
        />
        {isActiveLinking && (
          <>
            <InputLinkPreview
              customImagePreviewProps={register("customPreviewImage")}
              {...register("link")}
              control={control}
              linkValue={() => getValues("link")}
              setValue={setValue}
            />
            {errors.link && (
              <ErrorMessageBox>{errors.link.message}</ErrorMessageBox>
            )}
          </>
        )}
      </div>
      <div className="mb-[20px] flex justify-center gap-2">
        <Button className="w-[160px]" type="submit">
          Dodaj
        </Button>
        <Button
          className="w-[160px]"
          bgColorClassName="bg-[#616161]"
          onClick={onClose}
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
