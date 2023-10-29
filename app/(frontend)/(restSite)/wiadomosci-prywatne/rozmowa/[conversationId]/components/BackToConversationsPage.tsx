"use client";

import Link from "next/link";
import { IoChevronBackOutline } from "@react-icons/all-files/io5/IoChevronBackOutline";

const BackToConversationsPage = () => {
  return (
    <>
      <Link
        href="/wiadomosci-prywatne"
        className="md:hidden flex gap-2 items-center text-lg mb-4"
      >
        <IoChevronBackOutline />
        <span>Wróć do konwersacji</span>
      </Link>
      <style jsx global>
        {`
          @media (max-width: 767.99px) {
            #conversationSidebar {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default BackToConversationsPage;
