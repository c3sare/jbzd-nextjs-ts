import { AiOutlineLoading } from "react-icons/ai";

const LoadingForm = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_.6)] flex justify-center items-center">
      <AiOutlineLoading className="animate-spin" fontSize={50} color="white" />
    </div>
  );
};

export default LoadingForm;
