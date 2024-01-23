import { PropsWithChildren, Suspense } from "react";
import Form from "@/components/header/components/search/components/Form";

const SearchLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1 className="block text-[2em] mb-[0.67em] font-bold text-white">
        Szukaj
      </h1>
      <div className="w-full h-[120px] relative bg-[#1f1f1f] p-2">
        <Suspense>
          <Form />
        </Suspense>
      </div>
      {children}
    </>
  );
};

export default SearchLayout;
