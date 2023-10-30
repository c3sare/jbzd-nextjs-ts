import prisma from "@/libs/prismadb";

import NextAuth from "next-auth";
import authConfig from "./auth.config";

import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import LoginSchema from "./validators/Sidebar/LoginSchema";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Facebook,
    Google,
    Credentials({
      async authorize(credentials) {
        console.log(credentials);
        const { login, password } = LoginSchema.parse(credentials);

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: login }, { username: login }],
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          console.log("error");
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
});
