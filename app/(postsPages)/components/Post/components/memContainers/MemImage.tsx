import Image from "next/image";

type MemImageProps = {
  src: string;
  title: string;
};

const MemImage: React.FC<MemImageProps> = ({ src, title }) => {
  return (
    <Image
      src={src}
      alt={title}
      width={700}
      height={300}
      className="h-auto max-w-full"
    />
  );
};

export default MemImage;
