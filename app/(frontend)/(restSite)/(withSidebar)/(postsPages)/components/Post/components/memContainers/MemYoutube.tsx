import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type MemYoutubeProps = {
  videoId: string;
};

const MemYoutube: React.FC<MemYoutubeProps> = ({ videoId }) => {
  return (
    <ReactPlayer
      src={`https://youtube.com/watch?v=${videoId}`}
      style={{ width: "600px", maxWidth: "100%" }}
    />
  );
};

export default MemYoutube;
