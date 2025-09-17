"use client";

import Button from "@/components/Button";
import PresetButton from "../PresetButton";
import DayPicker from "@/components/forms/DayPicker";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import useArraySearchParams from "@/hooks/useArraySearchParams";
import useZodForm from "@/hooks/useZodForm";
import { z } from "zod";
import { FormProvider } from "react-hook-form";

const PostsDateFilterFormSchema = z.object({
  start: z.date().optional(),
  end: z.date().optional(),
});

type PostsDateFilterFormProps = {
  onClose: () => void;
};

const PostsDateFilterForm: React.FC<PostsDateFilterFormProps> = ({
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useArraySearchParams();
  const form = useZodForm({
    schema: PostsDateFilterFormSchema,
    defaultValues: (() => {
      const from = params.find((item) => item.param === "from")?.value;
      const to = params.find((item) => item.param === "to")?.value;

      return {
        start: from ? new Date(from) : undefined,
        end: to ? new Date(to) : undefined,
      };
    })(),
  });

  const { handleSubmit, watch } = form;

  const onSubmit = handleSubmit((data) => {
    const filteredParams = params.filter(
      (item) => !["from", "to", "date-preset"].includes(item.param)
    );

    const paramsString = filteredParams.map(
      (param) => `${param.param}=${param.value}`
    );

    paramsString.unshift(`to=${format(data.end!, "yyyy-MM-dd")}`);
    paramsString.unshift(`from=${format(data.start!, "yyyy-MM-dd")}`);

    const path = pathname.split("/")[1];

    router.push(`/${path}?` + paramsString.join("&"));
  });

  const handleReset = () => {
    const filteredParams = params.filter(
      (item) => !["from", "to", "date-preset"].includes(item.param)
    );

    const paramsString = filteredParams
      .map((param) => `${param.param}=${param.value}`)
      .join("&");

    router.push("?" + paramsString);
  };

  const isFiltered =
    params.filter((item) => ["from", "to", "date-preset"].includes(item.param))
      .length > 0;

  const dateFrom = watch("start");
  const dateTo = watch("end");

  return (
    <div className="relative md:absolute w-[660px] max-w-full mx-auto flex justify-center items-center gap-[10px] top-[5px] md:top-[calc(100%_+_5px)] z-10 bg-[#3c3c3c] md:left-0 flex-col p-[20px]">
      <div className="flex w-full gap-[10px] flex-wrap sm:flex-nowrap">
        <PresetButton preset="">Nowe</PresetButton>
        <PresetButton preset="6h">6h</PresetButton>
        <PresetButton preset="12h">12h</PresetButton>
        <PresetButton preset="24h">24h</PresetButton>
        <PresetButton preset="48h">48h</PresetButton>
        <PresetButton preset="7d">7d</PresetButton>
      </div>
      <FormProvider {...form}>
        <form
          className="flex gap-[4px] flex-col relative w-full"
          onSubmit={onSubmit}
        >
          <div className="flex gap-[20px] items-center justify-center my-2 flex-wrap w-full">
            <div className="flex-[0_0_100%] text-white font-bold text-center text-[12px]">
              Dowolny zakres dat:
            </div>
            <DayPicker id="start" title="Od:" maxDate={dateTo || new Date()} />
            <DayPicker
              id="end"
              title="Do:"
              minDate={dateFrom}
              maxDate={new Date()}
            />
          </div>
          <div className="flex w-full gap-[0_10px]">
            <Button
              disabled={!dateFrom || !dateTo}
              className="w-[70%]"
              buttonClassName="font-bold"
              type="submit"
            >
              Filtruj
            </Button>
            <Button
              className="w-[30%]"
              buttonClassName="font-bold"
              bgColorClassName="bg-[#2d2d2d]"
              disabled={!isFiltered}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PostsDateFilterForm;
