"use client";

import { SessionProvider } from "next-auth/react";

const AuthContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
