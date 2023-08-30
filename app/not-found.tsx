"use client";

import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="mt-[46px] flex items-stretch min-h-[calc(100vh_-_215px)] flex-wrap max-w-[1116px] px-[5px] m-[auto]">
      <h1 className="text-[22px] mb-[30px] block text-white font-bold my-[0.67em]">
        Błąd
      </h1>
      <Image
        src="/images/404.png"
        alt="Nie znalezion strony"
        width={878}
        height={816}
        className="block object-contain max-w-full"
      />
      <style jsx global>{`
        #sidebar {
          display: none !important;
        }
        #content {
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
