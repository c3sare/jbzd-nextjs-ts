import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/logowanie",
    signOut: "/api/auth/signout",
    error: "/logowanie",
    newUser: "/",
  },
} satisfies NextAuthConfig;
