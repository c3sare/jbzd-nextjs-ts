"use client";

import { useContext } from "react";
import { TermsContext } from "../../../_context/TermsProvider";

const SidebarFooter = () => {
  const { toggleTerms } = useContext(TermsContext);
  return (
    <ul className="mb-4 text-center">
      <li>
        <button onClick={toggleTerms} className="text-[#6e7578] bg-transparent">
          Regulamin
        </button>
      </li>
    </ul>
  );
};

export default SidebarFooter;
