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
  if (src.indexOf("http") === 0) return src;

  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(",")}/${src}`;
}
