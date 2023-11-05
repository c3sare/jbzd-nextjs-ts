import cloudinaryLoader from "@/cloudinaryLoader";
import Image from "next/image";
import { useContext } from "react";
import { LightBoxContext } from "../../../LightBox";

type ImageLightBoxProps = {
  src: string;
  alt: string;
};

const ImageLightBox: React.FC<ImageLightBoxProps> = ({ src, alt }) => {
  const createLightBox = useContext(LightBoxContext);
  return (
    <span
      className="cursor-pointer block max-w-[300px]"
      onClick={() => createLightBox([src], 0)}
    >
      <Image
        width={300}
        height={300}
        loader={cloudinaryLoader}
        src={src}
        alt={alt}
      />
    </span>
  );
};

export default ImageLightBox;
