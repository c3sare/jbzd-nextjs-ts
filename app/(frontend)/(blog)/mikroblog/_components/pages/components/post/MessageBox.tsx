import Image from "next/image";
import { useContext } from "react";
import { LightBoxContext } from "../../../LightBox";
import transformText from "../../_utils/transformText";
import cloudinaryLoader from "@/cloudinaryLoader";

type MessageBoxProps = {
  children?: React.ReactNode;
  images: {
    id: string;
    type: "IMAGE" | "VIDEO";
    url: string;
  }[];
  message: string;
};

const MessageBox: React.FC<MessageBoxProps> = ({ images, message }) => {
  const createLightbox = useContext(LightBoxContext);

  const handleShowImage = (index: number) => {
    createLightbox(
      images.map((item) => item.url),
      index
    );
  };

  const { parsed, usedImageIds } = transformText(message, images);

  return (
    <>
      <div className="break-words text-[13px] text-white mb-[10px] leading-[17px]">
        {parsed}
      </div>
      <div className="flex items-center flex-wrap">
        {images
          .filter((item) => !usedImageIds.includes(item.id))
          .map((image, i) => (
            <span
              key={image.id}
              onClick={() => handleShowImage(i)}
              className="w-[51px] m-[5px] h-[51px] block relative overflow-hidden cursor-pointer"
            >
              <Image
                loader={cloudinaryLoader}
                key={image.id}
                src={image.url}
                alt={`Obrazek mikroblog ${image.id}`}
                fill
                className="object-cover"
              />
            </span>
          ))}
      </div>
    </>
  );
};

export default MessageBox;
