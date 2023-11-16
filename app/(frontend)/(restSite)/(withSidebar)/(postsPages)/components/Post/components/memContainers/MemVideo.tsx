import { useEffect, useRef } from "react";
import { HiDownload } from "@react-icons/all-files/hi/HiDownload";

type MemVideoProps = {
  src: string;
  gif?: boolean;
};

const MemVideo: React.FC<MemVideoProps> = ({ src, gif }) => {
  const gifRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (gifRef.current && gif) gifRef.current.play();
  }, [src, gif]);

  const url =
    `https://res.cloudinary.com/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/${gif ? "image" : "video"}/upload/` + src;

  return (
    <>
      <video
        style={{ width: "600px", maxWidth: "100%", height: "auto" }}
        autoPlay={gif}
        playsInline={gif}
        loop={gif}
        muted={gif}
        src={url}
        controls={!gif}
        ref={gifRef}
      />
      {gif && (
        <a
          href={url}
          download
          target="_blank"
          className="absolute bottom-[15px] right-[15px] flex items-center justify-center w-[32px] h-[32px] bg-transparent hover:bg-[#de2127] transition-colors rounded-md"
        >
          <HiDownload size={23} />
        </a>
      )}
    </>
  );
};

export default MemVideo;
