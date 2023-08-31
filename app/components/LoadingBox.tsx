import { BiLoaderAlt } from "@react-icons/all-files/bi/BiLoaderAlt";

const LoadingBox = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
      <BiLoaderAlt className="animate-spin text-[26px]" />
    </div>
  );
};

export default LoadingBox;
