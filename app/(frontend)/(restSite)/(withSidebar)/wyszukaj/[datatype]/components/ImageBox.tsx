import Link from "next/link";

type ImageBoxProps = {
  post: {
    title: string;
    id: string;
    slug: string;
  };
};

const ImageBox: React.FC<ImageBoxProps> = ({ post }) => {
  return (
    <Link
      className="basis-[calc(25%-10px)] h-[140px] m-[5px] relative flex justify-center items-center text-center text-[12px] italic text-white bg-black p-[10px]"
      href={`/obr/${post.id}/${post.slug}`}
    >
      {post.title}
    </Link>
  );
};

export default ImageBox;
