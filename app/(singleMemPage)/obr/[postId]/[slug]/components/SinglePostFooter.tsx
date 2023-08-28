import Link from "next/link";
import { GiDiceSixFacesTwo } from "react-icons/gi";

const SinglePostFooter = () => {
  return (
    <div className="hidden md:flex justify-between mt-[35px] ml-[45px] pr-[5px]">
      <Link
        className="block leading-[50px] mb-[10px] text-white text-[18px] text-center w-full max-w-full rounded-[2px] bg-[#c03e3e]"
        href="/"
      >
        Przejdź na stronę główną
      </Link>
      <Link
        className="flex w-1/5 ml-[10px] relative h-[50px] items-center justify-center rounded-[2px] bg-[#c03e3e] text-[30px]"
        href="/losowe"
      >
        <GiDiceSixFacesTwo />
      </Link>
    </div>
  );
};

export default SinglePostFooter;
