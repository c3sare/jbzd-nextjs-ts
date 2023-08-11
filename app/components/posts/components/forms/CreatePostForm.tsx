import BigIconButton from "@/app/components/BigIconButton";
import Input from "@/app/components/Input";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { BiImage } from "react-icons/bi";
import { AiFillFileText, AiFillYoutube } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import Header from "./Header";
import Information from "./Information";
import InputStyled from "@/app/components/InputStyled";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import TextSwitchButton from "@/app/components/TextSwitchButton";
import Button from "@/app/components/Button";
import Tag from "./Tag";
import axios from "axios";
import LoadingBox from "@/app/components/LoadingBox";
import Category from "./Category";
import { Category as CategoryType } from "@prisma/client";

const cache: { [key: string]: any } = {};

const CreatePostForm = () => {
  const getCategoriesURL = "/api/categories";
  const [isLoading, setIsLoading] = useState<boolean>(!cache[getCategoriesURL]);
  const [categories, setCategories] = useState<CategoryType[]>(
    cache[getCategoriesURL] || []
  );

  useEffect(() => {
    if (!cache[getCategoriesURL]) {
      axios
        .get(getCategoriesURL)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const tagInput = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useForm();
  const {
    fields: memContainers,
    append: appendMem,
    remove: removeMem,
    move: moveMem,
  } = useFieldArray<FieldValues, "memContainers", "data">({
    name: "memContainers",
    control,
  });
  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray<FieldValues, "tags", "value">({
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
        !tags.filter((tag) => tag.value === e.currentTarget.value).length &&
        tags.length < 10
      ) {
        appendTag({ value: e.currentTarget.value });
        e.currentTarget.value = "";
      }
    }
  };

  const isActiveLinking = watch("isActiveLinking");

  return (
    <form className="my-[20px] bg-[#313131] p-[10px] relative text-left">
      <div className="w-full mb-[20px]">
        <Header>Wpisz tytuł</Header>
        <Input
          placeholder="Wpisz tytuł"
          register={register}
          errors={errors}
          id="title"
        />
      </div>
      <div className="w-full mb-[20px]">
        <Header>Co chcesz dodać?</Header>
        <div className="flex w-full gap-[5px] justify-between">
          <BigIconButton icon={<BiImage />}>Obrazek/Gif</BigIconButton>
          <BigIconButton icon={<AiFillFileText />}>Tekst</BigIconButton>
          <BigIconButton icon={<FaVideo />}>Video MP4</BigIconButton>
          <BigIconButton icon={<AiFillYoutube />}>Youtube</BigIconButton>
        </div>
      </div>
      {categories.length > 0 && (
        <div className="w-full mb-[20px]">
          <Header>Dział:</Header>
          <Information>
            Wybór działu jest obowiązkowy, subdział wybieramy tylko jeśli jest
            taka możliwość.
          </Information>
          <div className="flex gap-[5px] flex-wrap items-center">
            {categories.map((category) => (
              <Category
                name={category.name}
                fieldName="category"
                slug={category.slug}
                register={register}
                watch={watch}
              />
            ))}
          </div>
          <Information>Poddział dodajemy jeśli jest taka możliwość</Information>
        </div>
      )}
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
            {tags.map((tag, i) => (
              <Tag name={tag.value} onDelete={() => removeTag(i)} />
            ))}
          </ul>
        )}
      </div>
      <div className="mb-[20px]">
        <TextSwitchButton
          text="Pokaż linkowanie"
          activeText="Schowaj linkowanie"
          watch={watch}
          register={register}
          id="isActiveLinking"
        />
      </div>
      {isActiveLinking && (
        <div className="w-full mb-[20px]">
          <InputStyled placeholder="Wpisz link" {...register("link")} />
        </div>
      )}
      <div className="mb-[20px] flex justify-center gap-2">
        <Button className="w-[160px]" type="submit">
          Dodaj
        </Button>
        <Button className="w-[160px]" bgColorClassName="bg-[#616161]">
          Anuluj
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
