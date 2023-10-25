"use client";

import { PropsWithChildren, createContext, useState } from "react";

export const TermsContext = createContext({ toggleTerms: () => {} });

const TermsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleTerms = () => setIsVisible(!isVisible);

  return (
    <TermsContext.Provider value={{ toggleTerms }}>
      {children}
      {isVisible && <div className=""></div>}
    </TermsContext.Provider>
  );
};

export default TermsProvider;
