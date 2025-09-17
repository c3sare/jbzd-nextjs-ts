import LabelCheckbox from "@/components/LabelCheckbox";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { usePathname, useRouter } from "next/navigation";
import useArraySearchParams from "@/hooks/useArraySearchParams";
import useZodForm from "@/hooks/useZodForm";
import { z } from "zod";
import { FormProvider } from "react-hook-form";

type PostsTypeFilterFormProps = {
  isPremium: boolean;
  onClose: () => void;
};

const PostsTypeFilterFormSchema = z.object({
  pharse: z.string().min(1, "Pole jest puste!"),
  gif: z.boolean(),
  image: z.boolean(),
  text: z.boolean(),
  video: z.boolean(),
});

const PostsTypeFilterForm: React.FC<PostsTypeFilterFormProps> = ({
  isPremium,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useArraySearchParams();
  const form = useZodForm({
    schema: PostsTypeFilterFormSchema,
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
    })(),
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
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
  });

  return (
    <div className="relative md:absolute max-w-full mx-auto flex justify-center items-center gap-[10px] top-[5px] md:top-[calc(100%+5px)] z-10 bg-[#3c3c3c] md:left-1/2 md:translate-x-[-50%] flex-col p-[20px]">
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="max-w-full">
          <Input
            id="pharse"
            disabled={!isPremium}
            placeholder={
              isPremium ? "Wyszukaj..." : "Opcja dostępna dla Premium"
            }
          />
          <div className="flex flex-wrap items-center justify-center gap-4 my-2">
            <LabelCheckbox
              id="video"
              label="Video"
              variant="secondary"
              className="m-0"
            />
            <LabelCheckbox
              id="gif"
              label="Gify"
              variant="secondary"
              className="m-0"
            />
            <LabelCheckbox
              id="image"
              label="Obrazki"
              variant="secondary"
              className="m-0"
            />
            <LabelCheckbox
              id="text"
              label="Tekst"
              variant="secondary"
              className="m-0"
            />
          </div>
          <Button type="submit">Filtruj</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PostsTypeFilterForm;
