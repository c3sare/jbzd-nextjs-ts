import axios from "axios";
import { useState } from "react";

import InputStyled from "@/components/InputStyled";
import LinkPreviewContainer from "./LinkPreviewContainer";
import useZodFormContext from "@/hooks/useZodFormContext";

type LinkPreviewType = {
  description: string;
  domain: string;
  img: string;
  origin: string;
  title: string;
};

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch {
    return false;
  }
};

function InputLinkPreview() {
  const { control, register, getValues, setValue } = useZodFormContext();
  const acceptedImageType = ["image/jpeg", "image/png", "image/gif"];
  const [linkPreview, setLinkPreview] = useState<LinkPreviewType | null>(null);

  const getLinkInformation = async (url: string) => {
    try {
      const req = await axios.post("/api/sitepreview", { url });
      setLinkPreview(req.data);
      if (req.status === 200) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const inputLinkRegister = register("linking.url");
  const inputCustomImageRegister = register("linking.image");

  return (
    <>
      <div className="w-full mb-[20px]">
        <InputStyled
          placeholder="Wpisz link"
          ref={inputLinkRegister.ref}
          onBlur={async (e) => {
            if (e.target.value === "" && e.target.value !== getValues("link")) {
              setLinkPreview(null);
              setValue("linking.url", e.target.value);
            } else if (isValidUrl(e.target.value)) {
              const isValidPreview = await getLinkInformation(e.target.value);
              if (isValidPreview) setValue("linking.url", e.target.value);
            }
          }}
          name={inputLinkRegister.name}
        />
      </div>
      {linkPreview !== null && (
        <LinkPreviewContainer control={control} linkPreview={linkPreview}>
          <input
            type="file"
            accept={acceptedImageType.join(", ")}
            className="absolute bottom-0 left-0 bg-[#1d1d1d] text-white p-[5px]"
            ref={inputCustomImageRegister.ref}
            name={inputCustomImageRegister.name}
            onBlur={inputCustomImageRegister.onBlur}
            onChange={(e) => {
              if (e.target.files && e.target.files?.[0]) {
                const val = e.target.files[0];
                if (acceptedImageType.includes(val.type))
                  setValue("linking.image", val);
              }
            }}
          />
        </LinkPreviewContainer>
      )}
    </>
  );
}

export default InputLinkPreview;
