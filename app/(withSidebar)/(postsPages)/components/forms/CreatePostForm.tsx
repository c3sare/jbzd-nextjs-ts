"use client";

import type { Category as CategoryType } from "@prisma/client";
import type { FormEvent, KeyboardEvent } from "react";
import type { CreatePostType } from "@/validators/CreatePostSchema";

import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFieldArray, useForm } from "react-hook-form";
import React, { useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { BiImage } from "@react-icons/all-files/bi/BiImage";
import { FaVideo } from "@react-icons/all-files/fa/FaVideo";
import { AiFillFileText } from "@react-icons/all-files/ai/AiFillFileText";
import { AiFillYoutube } from "@react-icons/all-files/ai/AiFillYoutube";

import BigIconButton from "@/components/BigIconButton";
import InputStyled from "@/components/InputStyled";
import TextSwitchButton from "@/components/TextSwitchButton";
import Button from "@/components/Button";
import MemImage from "./FormPostElements/MemImage";
import MemVideo from "./FormPostElements/MemVideo";
import MemText from "./FormPostElements/MemText";
import MemYoutube from "./FormPostElements/MemYoutube";
import InputLinkPreview from "./CreatePostFormComponents/InputLinkPreview";
import ErrorMessageBox from "./CreatePostFormComponents/ErrorMessageBox";
import MemContainer from "./CreatePostFormComponents/MemContainer";
import CreatePostSchema from "@/validators/CreatePostSchema";

import Header from "./Header";
import Information from "./Information";
import Category from "./Category";
import Tag from "./Tag";

import objectToFormData from "@/utils/objectToFormData";
import toast from "react-hot-toast";
import LoadingForm from "./LoadingForm";
import { usePathname, useRouter } from "next/navigation";
import { createPost } from "@/actions/serverActions/createPost";

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
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      linking: { isActive: false },
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
    if (["Tab", ",", "Enter"].includes(e.key)) {
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

  const isActiveLinking = watch("linking.isActive");
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

  const onSubmit = async (data: CreatePostType) => {
    setIsLoading(true);
    const formData = objectToFormData(data);
    const res = await createPost(formData);
    if (res.type === "success") {
      toast.success(res.message);
      if (pathname === "/oczekujace") router.refresh();
      else router.push("/oczekujace");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="my-[20px] md:mx-0 mx-auto bg-[#313131] p-[10px] relative text-left max-w-[600px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full mb-[20px]">
        <Header>Wpisz tytuł</Header>
        <InputStyled
          placeholder="Wpisz tytuł"
          id="title"
          {...register("title")}
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
              {errors.memContainers?.[index] && (
                <ErrorMessageBox>
                  {errors.memContainers?.[index]?.message as string}
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
            onKeyDown={onPressKeyTagInput}
            onChange={onChangeTagInput}
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
          id="linking.isActive"
        />
        {isActiveLinking && (
          <>
            <InputLinkPreview
              register={register}
              getValues={getValues}
              setValue={setValue}
              control={control}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            {errors.linking && (
              <ErrorMessageBox>{errors.linking.message}</ErrorMessageBox>
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
          type="button"
        >
          Anuluj
        </Button>
      </div>
      {isLoading && <LoadingForm />}
    </form>
  );
};

export default CreatePostForm;
