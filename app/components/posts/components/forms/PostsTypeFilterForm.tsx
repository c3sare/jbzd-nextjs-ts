import LabelCheckbox from "@/app/components/LabelCheckbox";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type PostsTypeFilterFormProps = {
  isPremium: boolean;
};

const PostsTypeFilterForm: React.FC<PostsTypeFilterFormProps> = ({
  isPremium,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      pharse: searchParams.get("pharse")
        ? decodeURI(searchParams.get("pharse")!)
        : "",
      video: Boolean(searchParams.get("video")),
      gif: Boolean(searchParams.get("gif")),
      image: Boolean(searchParams.get("image")),
      text: Boolean(searchParams.get("text")),
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let params = [];

    if (data.pharse) params.push(`pharse=${encodeURI(data.pharse)}`);

    if (data.video) params.push("video=1");

    if (data.gif) params.push("gif=1");

    if (data.image) params.push("image=1");

    if (data.text) params.push("text=1");

    if (params.length > 0) router.push(`?${params.join("&")}`);
    else router.push(pathname);
  };

  return (
    <div className="absolute max-w-full flex justify-center items-center gap-[10px] top-[calc(100%_+_5px)] z-10 bg-[#3c3c3c] left-1/2 translate-x-[-50%] flex-col p-[20px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="pharse"
          register={register}
          errors={errors}
          disabled={!isPremium}
          placeholder={isPremium ? "Wyszukaj..." : "Opcja dostępna dla Premium"}
        />
        <div className="flex gap-4 items-center justify-center my-2">
          <LabelCheckbox
            register={register}
            watch={watch}
            id="video"
            label="Video"
            variant="secondary"
            className="m-0"
          />
          <LabelCheckbox
            register={register}
            watch={watch}
            id="gif"
            label="Gify"
            variant="secondary"
            className="m-0"
          />
          <LabelCheckbox
            register={register}
            watch={watch}
            id="image"
            label="Obrazki"
            variant="secondary"
            className="m-0"
          />
          <LabelCheckbox
            register={register}
            watch={watch}
            id="text"
            label="Tekst"
            variant="secondary"
            className="m-0"
          />
        </div>
        <Button type="submit">Filtruj</Button>
      </form>
    </div>
  );
};

export default PostsTypeFilterForm;
