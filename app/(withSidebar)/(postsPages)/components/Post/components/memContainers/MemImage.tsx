import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type MemImageProps = {
  src: string;
  title: string;
  postLink: string;
};

const MemImage: React.FC<MemImageProps> = ({ src, title, postLink }) => {
  return (
    <Link href={postLink}>
      <Image
        src={src}
        alt={title}
        width={600}
        height={300}
        className="h-auto max-w-full"
      />
    </Link>
  );
};

export default memo(MemImage);
