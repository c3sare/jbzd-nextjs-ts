import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";
import getUniqueId from "@/app/libs/getUniqueId";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "login", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: credentials.login }, { username: credentials.login }],
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
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
  callbacks: {
    signIn: async ({ user: userSignin, profile, account }) => {
      if (!profile?.email && !userSignin?.email) return false;

      if (
        !(userSignin as Partial<User>)?.username &&
        account?.type === "oauth"
      ) {
        const userUniqueId = getUniqueId();
        const username = "guest_" + userUniqueId;

        const update = await prisma.user.update({
          where: {
            email: profile?.email! || userSignin?.email!,
          },
          data: {
            username,
          },
        });

        if (!update) return false;
      }

      return true;
    },
    jwt: async ({ token, user, account }) => {
      if (user && account) {
        token.provider = account.provider;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (!session.user?.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
      });

      if (!dbUser) return session;

      session.user.provider = token.provider;
      session.user.username = dbUser.username!;
      delete session.user.name;

      return session;
    },
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
