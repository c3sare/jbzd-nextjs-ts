import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type MemYoutubeProps = {
  videoId: string;
};

const MemYoutube: React.FC<MemYoutubeProps> = ({ videoId }) => {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (player === null)
      setPlayer(
        <ReactPlayer
          url={`https://youtube.com/watch?v=${videoId}`}
          style={{ width: "600px", maxWidth: "100%" }}
        />
      );
  }, []);

  return player;
};

export default MemYoutube;
