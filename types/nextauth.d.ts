import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user?: {
      email: string;
      image: string | null;
      username: string;
      provider: "google" | "facebook" | "credentials";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {
    provider: string;
  }
}
