import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      image: string | null;
      username: string;
      provider: "google" | "facebook" | "credentials";
      isDeleted?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {
    provider: string;
    userId: string;
  }
}