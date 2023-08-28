"use client";

import type { SubmitHandler } from "react-hook-form";

import Button from "@/app/components/Button";
import PresetButton from "../PresetButton";
import DayPicker from "@/app/components/forms/DayPicker";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import useArraySearchParams from "@/app/hooks/useArraySearchParams";

type PostsDateFilterFormData = {
  start?: Date;
  end?: Date;
};

type PostsDateFilterFormProps = {
  onClose: () => void;
};

const PostsDateFilterForm: React.FC<PostsDateFilterFormProps> = ({
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useArraySearchParams();
  const { register, watch, setValue, handleSubmit } =
    useForm<PostsDateFilterFormData>({
      defaultValues: (() => {
        const from = params.find((item) => item.param === "to")?.value;
        const to = params.find((item) => item.param === "to")?.value;

        return {
          start: from ? new Date(from) : undefined,
          end: to ? new Date(to) : undefined,
        };
      })(),
    });

  const onSubmit: SubmitHandler<PostsDateFilterFormData> = (data) => {
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
  };

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
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="relative md:absolute w-[660px] max-w-full flex justify-center items-center gap-[10px] top-[5px] md:top-[calc(100%_+_5px)] z-10 bg-[#3c3c3c] md:left-0 flex-col p-[20px]"
    >
      <div className="flex w-full gap-[10px] flex-wrap sm:flex-nowrap">
        <PresetButton preset="">Nowe</PresetButton>
        <PresetButton preset="6h">6h</PresetButton>
        <PresetButton preset="12h">12h</PresetButton>
        <PresetButton preset="24h">24h</PresetButton>
        <PresetButton preset="48h">48h</PresetButton>
        <PresetButton preset="7d">7d</PresetButton>
      </div>
      <form className="flex gap-[4px] flex-col relative w-full">
        <div className="flex gap-[20px] items-center justify-center my-2 flex-wrap w-full">
          <div className="flex-[0_0_100%] text-white font-bold text-center text-[12px]">
            Dowolny zakres dat:
          </div>
          <DayPicker
            register={register}
            watch={watch}
            id="start"
            setValue={setValue}
            title="Od:"
            maxDate={dateTo || new Date()}
          />
          <DayPicker
            register={register}
            watch={watch}
            id="end"
            setValue={setValue}
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
    </div>
  );
};

export default PostsDateFilterForm;
