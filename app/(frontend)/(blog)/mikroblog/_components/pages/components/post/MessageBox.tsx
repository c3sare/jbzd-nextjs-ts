import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { LightBoxContext } from "../../../LightBox";
import transformText from "../../_utils/transformText";
import clsx from "clsx";

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
  const [readMore, setReadMore] = useState<boolean>(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleShowImage = (index: number) => {
    createLightbox(
      images.map((item) => item.url),
      index
    );
  };

  useEffect(() => {
    if (messageContainerRef.current)
      if (messageContainerRef.current.clientHeight > 500) {
        setReadMore(true);
      }
  }, []);

  const { parsed, usedImageIds } = transformText(message, images);

  return (
    <div
      className={clsx(
        "w-full",
        readMore && "max-h-[450px] overflow-hidden relative"
      )}
      ref={messageContainerRef}
    >
      <div className="break-words text-[13px] text-white mb-[10px] leading-[17px]">
        {parsed}
      </div>
      <div className="flex flex-wrap items-center">
        {images
          .filter((item) => !usedImageIds.includes(item.id))
          .map((image, i) => (
            <span
              key={image.id}
              onClick={() => handleShowImage(i)}
              className="w-[51px] m-[5px] h-[51px] block relative overflow-hidden cursor-pointer"
            >
              <Image
                key={image.id}
                src={image.url}
                alt={`Obrazek mikroblog ${image.id}`}
                fill
                className="object-cover"
              />
            </span>
          ))}
      </div>
      {readMore && (
        <button
          onClick={() => setReadMore(false)}
          className="block text-center py-[10px] bg-[#222] mt-[2px] text-[#c23d3a] text-[14px] absolute bottom-0 w-full"
        >
          Zobacz więcej
        </button>
      )}
    </div>
  );
};

export default MessageBox;
