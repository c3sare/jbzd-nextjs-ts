"use client";

import { FaQuoteLeft } from "@react-icons/all-files/fa/FaQuoteLeft";

const Quote: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <blockquote className="mt-[5px] p-[10px] italic text-[13px] text-[#777] border border-[#1f1f1f] rounded-[2px] bg-[#313131]">
      <FaQuoteLeft />
      {children}
      <FaQuoteLeft />
    </blockquote>
  );
};

export default Quote;
