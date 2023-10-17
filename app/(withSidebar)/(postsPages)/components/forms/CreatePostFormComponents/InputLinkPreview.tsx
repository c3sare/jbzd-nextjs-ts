/* eslint-disable @next/next/no-img-element */
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import axios from "axios";
import { useState } from "react";

import InputStyled from "@/components/InputStyled";
import LinkPreviewContainer from "./LinkPreviewContainer";

type LinkPreviewType = {
  description: string;
  domain: string;
  img: string;
  origin: string;
  title: string;
};

type InputLinkPreviewProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  control: Control<any>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

function InputLinkPreview<T extends FieldValues>({
  register,
  getValues,
  setValue,
  control,
  isLoading,
  setIsLoading,
}: InputLinkPreviewProps<T>) {
  const acceptedImageType = ["image/jpeg", "image/png", "image/gif"];
  const [linkPreview, setLinkPreview] = useState<LinkPreviewType | null>(null);

  const getLinkInformation = async (url: string) => {
    try {
      setIsLoading(true);
      const req = await axios.post("/api/sitepreview", { url });
      setLinkPreview(req.data);
      setIsLoading(false);
      if (req.status === 200) return true;
      else return false;
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };

  const inputLinkRegister = register("linking.url" as Path<T>);
  const inputCustomImageRegister = register("linking.image" as Path<T>);

  return (
    <>
      <div className="w-full mb-[20px]">
        <InputStyled
          placeholder="Wpisz link"
          ref={inputLinkRegister.ref}
          onBlur={async (e) => {
            if (
              e.target.value === "" &&
              e.target.value !== getValues("link" as Path<T>)
            ) {
              setLinkPreview(null);
              setValue(
                "linking.url" as Path<T>,
                e.target.value as PathValue<T, Path<T>>
              );
            } else if (isValidUrl(e.target.value)) {
              const isValidPreview = await getLinkInformation(e.target.value);
              if (isValidPreview)
                setValue(
                  "linking.url" as Path<T>,
                  e.target.value as PathValue<T, Path<T>>
                );
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
                  setValue(
                    "linking.image" as Path<T>,
                    val as PathValue<T, Path<T>>
                  );
              }
            }}
          />
        </LinkPreviewContainer>
      )}
    </>
  );
}

export default InputLinkPreview;
