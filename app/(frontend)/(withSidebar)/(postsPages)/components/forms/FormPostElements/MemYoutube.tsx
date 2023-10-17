import type { Control, FieldValues, Path } from "react-hook-form";
import type { FocusEventHandler } from "react";

import axios from "axios";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import YouTube from "react-youtube";

type MemYoutubeProps<T extends FieldValues> = {
  setData: (val: string) => void;
  fieldName: Path<T>;
  control: Control<T>;
};

function youtube_parser(url: string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

function MemYoutube<T extends FieldValues>({
  setData,
  fieldName,
  control,
}: MemYoutubeProps<T>) {
  const data = useWatch({ control, name: fieldName });

  const [disabled, setDisabled] = useState<boolean>(false);
  const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const vidId = youtube_parser(e.currentTarget.value);

    if (vidId) {
      setDisabled(true);
      axios
        .post("/api/youtube/" + vidId)
        .then((res) => {
          if (res.data.videoExist) {
            setData(vidId);
          }
        })
        .finally(() => setDisabled(false));
    }
  };

  return (
    <div className="bg-[#1f1f1f] p-[15px] relative">
      {data === "" ? (
        <div>
          <header className="text-white text-[16px] font-bold mb-[10px]">
            Link do filmu Youtube
          </header>
          <input
            className="w-full max-w-full resize-none bg-[#313131] inline-block leading-[38px] text-white placeholder:text-[#808080] px-[10px] border border-[#1f1f1f] disabled:opacity-60"
            placeholder="Wklej link filmu Youtube"
            type="text"
            disabled={disabled}
            onBlur={onBlur}
          />
        </div>
      ) : (
        <>
          <YouTube opts={{ width: "100%", height: "310px" }} videoId={data} />
          <button
            type="button"
            className="absolute bottom-[15px] right-[15px] bg-[#505050] text-white text-[13px] rounded-[3px] leading-[34px] px-[15px] cursor-pointer z-[3] shadow-md"
            onClick={() => setData("")}
          >
            Zmień
          </button>
        </>
      )}
    </div>
  );
}

export default MemYoutube;
