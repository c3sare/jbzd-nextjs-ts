"use client";

import Button from "@/app/components/Button";
import PresetButton from "../PresetButton";
import DayPicker from "@/app/components/forms/DayPicker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";

type PostsDateFilterFormData = {
  start?: Date;
  end?: Date;
};

const PostsDateFilterForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const { register, watch, setValue, handleSubmit } =
    useForm<PostsDateFilterFormData>({
      defaultValues: {
        start: params.get("from") ? new Date(params.get("from")!) : undefined,
        end: params.get("to") ? new Date(params.get("to")!) : undefined,
      },
    });

  const onSubmit: SubmitHandler<PostsDateFilterFormData> = (data) => {
    router.push(
      `?from=${format(data.start!, "yyyy-MM-dd")}&to=${format(
        data.end!,
        "yyyy-MM-dd"
      )}`
    );
  };

  const handleReset = () => router.push(pathname);

  const isFiltered =
    params.get("date-preset") || (params.get("from") && params.get("to"));

  const dateFrom = watch("start");
  const dateTo = watch("end");

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="absolute w-[660px] max-w-full flex justify-center items-center gap-[10px] top-[calc(100%_+_5px)] z-10 bg-[#3c3c3c] left-1/2 translate-x-[-50%] flex-col p-[20px]"
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
