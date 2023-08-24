import Link from "next/link";

type MemTextProps = {
  html: string;
  postLink: string;
};

const MemText: React.FC<MemTextProps> = ({ html, postLink }) => {
  return (
    <Link href={postLink}>
      <div
        className="w-full p-[10px_15px] leading-[30px] text-[18px] text-white bg-[#000] overflow-hidden"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Link>
  );
};

export default MemText;
