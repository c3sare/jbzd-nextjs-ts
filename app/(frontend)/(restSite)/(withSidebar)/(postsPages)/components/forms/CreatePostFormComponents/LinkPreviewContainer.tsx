/* eslint-disable @next/next/no-img-element */

import { Control, FieldValues, useWatch } from "react-hook-form";

type LinkPreviewContainerProps = {
  linkPreview: {
    domain: string;
    title: string;
    img: string;
    description: string;
    origin: string;
  };
  control: Control<FieldValues>;
  children?: React.ReactNode;
};

const LinkPreviewContainer: React.FC<LinkPreviewContainerProps> = ({
  linkPreview,
  children,
  control,
}) => {
  const linkImageValue = useWatch({ control, name: "linking.image" });

  return (
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
            linkImageValue
              ? URL.createObjectURL(linkImageValue)
              : linkPreview.img
          }
          width="40px"
          height="40px"
          className="w-full block h-[130px] max-w-full"
        />
        {children}
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
  );
};

export default LinkPreviewContainer;
