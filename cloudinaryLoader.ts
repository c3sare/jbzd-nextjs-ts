"use client";

type cloudinaryLoader = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: cloudinaryLoader) {
  if (src.indexOf("/") === 0 || src.indexOf("http") === 0)
    return `/_next/image?url=${src}&w=${width}&q=${quality || 75}`;

  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(",")}/${src}`;
}
