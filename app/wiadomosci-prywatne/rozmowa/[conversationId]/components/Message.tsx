import Image from "next/image";

const Message = () => {
  return (
    <div className="w-[calc(100%_-_20px)] bg-[#252525] rounded-[10px] p-[15px] flex mb-[10px] relative">
      <div className="min-w-[35px] mr-[10px]">
        <div className="min-w-[35px] mr-[10px]">
          <Image
            height={35}
            width={35}
            className="block h-auto max-w-full rounded-full"
            src="/images/avatars/default.jpg"
            alt="Avatar"
          />
        </div>
      </div>
      <div className="max-w-[550px] flex-grow">
        <div className="text-[#777] font-bold mb-[7px] text-[12px]">
          {"username"}
        </div>
        <div className="text-white text-[14px] break-words overflow-hidden">
          {"body"}
        </div>
      </div>
      <div className="text-[12px] text-[#777] italic absolute right-[15px] top-[15px]">
        {"yyyy-MM-dd HH:mm"}
      </div>
    </div>
  );
};

export default Message;
