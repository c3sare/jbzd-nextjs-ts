import Image from "next/image";

type AvatarProps = {
  src: string;
  size: number;
};

const Avatar: React.FC<AvatarProps> = ({ src, size }) => (
  <Image
    alt="Avatar"
    src={src}
    height={size}
    width={size}
    className="rounded-full"
  />
);

export default Avatar;
