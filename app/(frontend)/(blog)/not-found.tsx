import Image from "next/image";
import notFoundImg from "@/public/images/404.png";

const NotFoundPage = () => {
  return (
    <div className="mt-[46px] flex items-stretch min-h-[calc(100vh_-_215px)] flex-wrap max-w-[1116px] px-[5px] m-[auto]">
      <h1 className="text-[22px] mb-[30px] block text-white font-bold my-[0.67em]">
        Błąd
      </h1>
      <Image
        src={notFoundImg}
        alt="Nie znalezion strony"
        width={878}
        height={816}
        className="block object-contain max-w-full"
      />
    </div>
  );
};

export default NotFoundPage;
