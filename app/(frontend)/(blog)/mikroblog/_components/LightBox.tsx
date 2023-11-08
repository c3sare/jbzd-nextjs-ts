"use client";

import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { BsChevronLeft } from "@react-icons/all-files/bs/BsChevronLeft";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";

import { PropsWithChildren, createContext, useRef, useState } from "react";
import Image from "next/image";

export const LightBoxContext = createContext(
  (_images: string[], _index: number) => {}
);

const LightBox: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const subcontainer = useRef<HTMLDivElement | null>(null);

  const createLightBox = (images: string[], index: number = 0) => {
    setCurrentImage(index);
    setImages(images);
    setOpen(true);
  };

  const handleCloseLightBox = () => {
    setOpen(false);
    setCurrentImage(0);
    setImages([]);
  };

  const handlePrevSlide = () => {
    setCurrentImage((prev) => {
      if (prev - 1 < 0) {
        return images.length - 1;
      } else return prev - 1;
    });
  };

  const handleNextSlide = () => {
    setCurrentImage((prev) => {
      if (images.length - 1 < prev + 1) {
        return 0;
      } else return prev + 1;
    });
  };

  return (
    <LightBoxContext.Provider value={createLightBox}>
      {children}
      {open && (
        <div
          ref={container}
          className="w-full h-full fixed top-0 left-0 bg-[rgba(0,_0,_0,_.6)] z-[9999]"
          onClick={(e) => {
            if (container.current === e.target) handleCloseLightBox();
          }}
        >
          <div
            ref={subcontainer}
            onClick={(e) => {
              if (subcontainer.current === e.target) handleCloseLightBox();
            }}
            className="h-[80%] my-[10%] max-w-[75%] flex items-center justify-center mx-auto relative"
          >
            <Image
              alt="Lightbox image"
              src={images[currentImage]!}
              width={1500}
              height={1500}
              className="w-auto max-h-full"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 group/prev hover:text-[#58e8d2] transition-colors"
              >
                <BsChevronLeft
                  className="relative group-hover/prev:animate-bounceleft"
                  size={36}
                />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 group/next hover:text-[#58e8d2] transition-colors"
              >
                <BsChevronRight
                  className="relative group-hover/next:animate-bounceright"
                  size={36}
                />
              </button>
            </>
          )}
          <button
            onClick={handleCloseLightBox}
            className="absolute top-0 right-0 w-[40px] h-[40px] flex items-center justify-center hover:bg-[rgba(0,_0,_0,_.6)] transition-colors text-[18px] hover:text-[#58e8d2] group/close"
          >
            <AiOutlineClose className="transition-transform group-hover/close:scale-75" />
          </button>
        </div>
      )}
    </LightBoxContext.Provider>
  );
};

export default LightBox;
