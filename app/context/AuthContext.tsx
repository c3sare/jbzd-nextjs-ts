"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const NotExistAccountLogout: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data?.user?.isDeleted === true) {
      signOut();
    }
  }, [session.data?.user?.isDeleted, router]);

  return <>{children}</>;
};

const AuthContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <NotExistAccountLogout>{children}</NotExistAccountLogout>
    </SessionProvider>
  );
};

export default AuthContext;
