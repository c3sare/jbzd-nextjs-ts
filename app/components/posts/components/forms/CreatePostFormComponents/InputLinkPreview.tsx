import InputStyled from "@/app/components/InputStyled";
import LoadingBox from "@/app/components/LoadingBox";
import axios from "axios";
import { forwardRef, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

type LinkPreviewType = {
  description: string;
  domain: string;
  img: string;
  origin: string;
  title: string;
};

type InputLinkPreviewProps<T extends FieldValues> = {
  name: Path<T>;
  onBlur: any;
  onChange: any;
  customImagePreviewProps: UseFormRegisterReturn<Path<T>>;
  linkValue: () => string | undefined;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
};

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

function InputLinkPreview<T extends FieldValues>(
  {
    onBlur,
    onChange,
    name,
    control,
    customImagePreviewProps,
    linkValue,
    setValue,
  }: InputLinkPreviewProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
  const [linkPreview, setLinkPreview] = useState<LinkPreviewType | null>(null);
  const customLinkPreview = useWatch({
    control,
    name: "customPreviewImage" as Path<T>,
  });

  const getLinkInformation = async (url: string) => {
    try {
      setIsLoadingPreview(true);
      const req = await axios.post("/api/sitepreview", { url });
      setLinkPreview(req.data);
      setIsLoadingPreview(false);
      if (req.status === 200) return true;
      else return false;
    } catch (error: any) {
      console.log(error);
      setIsLoadingPreview(false);
      return false;
    }
  };

  return (
    <>
      <div className="w-full mb-[20px]">
        <InputStyled
          placeholder="Wpisz link"
          ref={ref}
          onBlur={async (e) => {
            onBlur(e);
            if (
              e.currentTarget.value === "" &&
              e.currentTarget.value !== linkValue()
            ) {
              setLinkPreview(null);
              onChange(e);
            } else if (isValidUrl(e.currentTarget.value)) {
              const isValidPreview = await getLinkInformation(
                e.currentTarget.value
              );
              if (isValidPreview) onChange(e);
            }
          }}
          name={name}
        />
      </div>
      {isLoadingPreview && <LoadingBox />}
      {linkPreview !== null && (
        <a
          href={linkPreview.domain}
          rel="nofollow"
          target="_blank"
          className="flex max-w-full h-[130px] overflow-hidden"
        >
          <div className="flex-[0_0_240px] h-[130px] overflow-hidden relative">
            <img
              alt={linkPreview.title}
              src={
                customLinkPreview
                  ? URL.createObjectURL(customLinkPreview)
                  : linkPreview.img
              }
              width="40px"
              height="40px"
              className="w-full block h-[130px] max-w-full"
            />
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="absolute bottom-0 left-0 bg-[#1d1d1d] text-white p-[5px]"
              ref={customImagePreviewProps.ref}
              onBlur={customImagePreviewProps.onBlur}
              name={customImagePreviewProps.name}
              onChange={(e) => {
                if (e.currentTarget.files?.[0]) {
                  setValue("customPreviewImage", e.currentTarget.files[0]);
                }
              }}
            />
          </div>
          <div className="w-full p-[8px] bg-[#1f1f1f] pl-[18px] overflow-hidden">
            <header className="text-white font-bold text-[14px] mb-[5px] max-h-[40px] overflow-hidden">
              {linkPreview.title}
            </header>
            <p className="text-white m-0 mb-[5px] text-[12px] max-h-[52px] overflow-hidden">
              {linkPreview.description}
            </p>
            <footer className="text-[#68a2bb] text-right text-[11px] overflow-hidden max-h-[18px] font-bold">
              {linkPreview.origin}
            </footer>
          </div>
        </a>
      )}
    </>
  );
}

export default forwardRef(InputLinkPreview);
