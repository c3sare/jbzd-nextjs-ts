import LabelCheckbox from "@/app/components/LabelCheckbox";
import ZodForm from "@/app/components/forms/ZodForm";
import Button from "@/app/components/sidebar/components/forms/components/Button";
import Input from "@/app/components/sidebar/components/forms/components/Input";
import PostsTypeFilterSchema from "@/app/formSchemas/PostsTypeFilterSchema";
import useZodForm from "@/app/hooks/useZodForm";

const PostsTypeFilterForm = () => {
  const { zodFormComponentProps, watch, register, isLoading } = useZodForm({
    zodSchema: PostsTypeFilterSchema,
    pushFormDataEndpoint: "",
  });

  return (
    <div className="absolute flex justify-center items-center gap-[10px] top-[calc(100%_+_5px)] z-10 bg-[#3c3c3c] left-1/2 translate-x-[-50%] flex-col p-[20px]">
      <ZodForm {...zodFormComponentProps}>
        <Input id="pharse" placeholder="Wyszukaj..." />
        <div className="flex gap-4 items-center justify-center my-2">
          <LabelCheckbox
            register={register}
            disabled={isLoading}
            watch={watch}
            id="video"
            label="Video"
            variant="secondary"
            className="m-0"
          />
          <LabelCheckbox
            register={register}
            disabled={isLoading}
            watch={watch}
            id="gif"
            label="Gify"
            variant="secondary"
            className="m-0"
          />
          <LabelCheckbox
            register={register}
            disabled={isLoading}
            watch={watch}
            id="image"
            label="Obrazki"
            variant="secondary"
            className="m-0"
          />
          <LabelCheckbox
            register={register}
            disabled={isLoading}
            watch={watch}
            id="text"
            label="Tekst"
            variant="secondary"
            className="m-0"
          />
        </div>
        <Button type="submit">Filtruj</Button>
      </ZodForm>
    </div>
  );
};

export default PostsTypeFilterForm;
