import BigIconButton from "@/app/components/BigIconButton";
import Input from "@/app/components/Input";
import { useFieldArray, useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import CreatePostSchema, {
  CreatePostType,
} from "@/app/formSchemas/CreatePostSchema";
import MemImage from "./FormPostElements/MemImage";
import MemVideo from "./FormPostElements/MemVideo";
import MemText from "./FormPostElements/MemText";
import MemYoutube from "./FormPostElements/MemYoutube";

type CategoryWithChildrenType = CategoryType & {
  children: CategoryType[];
};

const cache: { [key: string]: any } = {};

const CreatePostForm = () => {
  const getCategoriesURL = "/api/categories";
  const [isLoading, setIsLoading] = useState<boolean>(!cache[getCategoriesURL]);
  const [categories, setCategories] = useState<CategoryWithChildrenType[]>(
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
    setValue,
    control,
  } = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema),
  });
  const {
    fields: memContainers,
    append: appendMem,
    remove: removeMem,
    move: moveMem,
    update: updateMem,
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

  const memElements = {
    "IMAGE-GIF": MemImage,
    VIDEO: MemVideo,
    TEXT: MemText,
    YOUTUBE: MemYoutube,
  };

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
      case "IMAGE-GIF": {
        appendMem({
          type,
          data: {},
        });
        break;
      }
      case "VIDEO": {
        appendMem({
          type,
          data: {},
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

  const category = categories.find(
    (item) =>
      item.slug === currentCategory ||
      (item.children &&
        item.children.filter((subitem) => subitem.slug === currentCategory)
          .length > 0)
  );

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
          <BigIconButton
            onClick={(e) => handleAddMemContainer(e, "IMAGE-GIF")}
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
        {memContainers.map(({ id, type, data }, index) => {
          const MemElement = memElements[type];

          return (
            <MemElement
              key={id}
              data={data}
              setData={(data: any) => updateMem(index, data)}
            />
          );
        })}
      </div>
      {categories.length > 0 && (
        <div className="w-full mb-[20px]">
          <Header>
            <span>Dział:</span>
            {currentCategory && (
              <>
                <span className="text-white p-[3px_9px] rounded-[3px] inline-block text-[12px] cursor-pointer bg-[#c03e3e] font-bold">
                  {category?.name}
                </span>
                <button
                  className="text-[#6e7578] text-[11px] cursor-pointer"
                  onClick={() => setValue("category", "")}
                >
                  wyczyść
                </button>
              </>
            )}
          </Header>
          {!currentCategory && (
            <>
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
            </>
          )}
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
