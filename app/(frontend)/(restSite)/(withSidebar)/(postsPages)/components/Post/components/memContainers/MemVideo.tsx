import "plyr-react/plyr.css";
import dynamic from "next/dynamic";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

import { memo, useEffect, useMemo, useRef } from "react";

type MemVideoProps = {
  src: string;
  gif?: boolean;
};

const MemVideo: React.FC<MemVideoProps> = ({ src, gif }) => {
  const ref = useRef<HTMLDivElement>(null);
  src =
    `https://res.cloudinary.com/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/${gif ? "image" : "video"}/upload/` + src;
  const plyr = useMemo(
    () => (
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src,
              type: "video/mp4",
            },
          ],
        }}
        options={{
          controls: gif
            ? []
            : [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen",
              ],
          autoplay: gif,
          loop: { active: gif || false },
          hideControls: !gif,
          disableContextMenu: false,
        }}
        playsInline={false}
        loop={gif}
        autoPlay={gif}
      />
    ),
    [src, gif]
  );

  useEffect(() => {
    if (ref.current !== null) {
      const a = `<a class="plyr__controls__item plyr__control" href="${src}" target="_blank" download="" data-plyr="download" aria-pressed="false"><svg aria-hidden="true" focusable="false"><use xlink:href="#plyr-download"></use></svg><span class="plyr__sr-only">Download</span></a>`;
      const plyrControls =
        ref.current.querySelector(".plyr__controls")?.innerHTML;
      ref.current.querySelector(".plyr__controls")!.innerHTML =
        plyrControls + a;
    }
  }, [src]);

  return (
    <div ref={ref} className="w-[600px] max-w-full">
      {plyr}
    </div>
  );
};

export default memo(MemVideo);
