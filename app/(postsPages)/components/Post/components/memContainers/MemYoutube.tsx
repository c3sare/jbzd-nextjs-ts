import { memo } from "react";
import YouTubePlayer from "react-youtube";

type MemYoutubeProps = {
  videoId: string;
};

const MemYoutube: React.FC<MemYoutubeProps> = ({ videoId }) => {
  return (
    <YouTubePlayer
      opts={{ width: "100%", height: "338px" }}
      style={{ width: "600px", maxWidth: "100%" }}
      videoId={videoId}
    />
  );
};

export default memo(MemYoutube);
