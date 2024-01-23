import { DefaultJWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      email: string;
      image: string | null;
      username: string;
      provider: "google" | "facebook" | "credentials";
      isDeleted?: boolean;
      coins: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    provider: string;
    userId: string;
  }
}
