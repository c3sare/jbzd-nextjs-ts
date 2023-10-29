"use client";

import { useState } from "react";
import Terms from "./Terms";

const SidebarFooter = () => {
  const [isVisibleTerms, setIsVisibleTerms] = useState<boolean>(false);
  return (
    <ul className="mb-4 text-center">
      <li>
        <button
          onClick={() => setIsVisibleTerms(true)}
          className="text-[#6e7578] bg-transparent"
        >
          Regulamin
        </button>
        {isVisibleTerms && (
          <Terms closeTerms={() => setIsVisibleTerms(false)} />
        )}
      </li>
    </ul>
  );
};

export default SidebarFooter;
