"use client";

import { PropsWithChildren, createContext, useState } from "react";
import Terms from "../_components/layout/Terms";

export const TermsContext = createContext({ toggleTerms: () => {} });

const TermsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleTerms = () => setIsVisible(!isVisible);

  return (
    <TermsContext.Provider value={{ toggleTerms }}>
      {children}
      {isVisible && <Terms toggleTerms={toggleTerms} />}
    </TermsContext.Provider>
  );
};

export default TermsProvider;
