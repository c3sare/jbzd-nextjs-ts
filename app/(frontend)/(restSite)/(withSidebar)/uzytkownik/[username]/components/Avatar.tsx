"use client";

import Image from "next/image";

type AvatarProps = {
  src?: string | null;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      height={118}
      width={118}
      alt="Avatar"
      src={src || "/images/avatars/default.jpg"}
      className="rounded-full h-fit mx-auto md:mx-0"
    />
  );
};

export default Avatar;
