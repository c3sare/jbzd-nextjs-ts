import type { FieldValues, SubmitHandler } from "react-hook-form";

import LabelCheckbox from "@/components/LabelCheckbox";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useArraySearchParams from "@/hooks/useArraySearchParams";

type PostsTypeFilterFormProps = {
  isPremium: boolean;
  onClose: () => void;
};

const PostsTypeFilterForm: React.FC<PostsTypeFilterFormProps> = ({
  isPremium,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useArraySearchParams();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: (() => {
      const pharse =
        params.find((item) => item.param === "pharse")?.value || "";
      const video = Boolean(
        Number(params.find((item) => item.param === "video")?.value)
      );
      const gif = Boolean(
        Number(params.find((item) => item.param === "gif")?.value)
      );
      const image = Boolean(
        Number(params.find((item) => item.param === "image")?.value)
      );
      const text = Boolean(
        Number(params.find((item) => item.param === "text")?.value)
      );

      return { pharse: decodeURI(pharse), video, gif, image, text };
    })() as any,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const filteredParams = params.filter(
      (item) =>
        !["pharse", "video", "gif", "image", "text"].includes(item.param)
    );

    const paramsString = filteredParams.map(
      (item) => `${item.param}=${item.value}`
    );

    if (data.pharse) paramsString.push(`pharse=${encodeURI(data.pharse)}`);

    if (data.video) paramsString.push("video=1");

    if (data.gif) paramsString.push("gif=1");

    if (data.image) paramsString.push("image=1");

    if (data.text) paramsString.push("text=1");

    const path = pathname.split("/")[1];

    if (paramsString.length > 0)
      router.push(`/${path}?${paramsString.join("&")}`);
    else router.push(pathname);
  };

  return (
    <div className="relative md:absolute max-w-full mx-auto flex justify-center items-center gap-[10px] top-[5px] md:top-[calc(100%_+_5px)] z-10 bg-[#3c3c3c] md:left-1/2 md:translate-x-[-50%] flex-col p-[20px]">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-full">
        <Input
          id="pharse"
          register={register}
          errors={errors}
          disabled={!isPremium}
          placeholder={isPremium ? "Wyszukaj..." : "Opcja dostępna dla Premium"}
        />
        <div className="flex flex-wrap items-center justify-center gap-4 my-2">
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
