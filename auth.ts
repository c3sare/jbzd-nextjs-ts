import NextAuth from "next-auth";
import authConfig from "./auth.config";

import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import LoginSchema from "./validators/Sidebar/LoginSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import getUniqueId from "@/utils/getUniqueId";

type SessionProvider = "credentials" | "google" | "facebook";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
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
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user && account) {
        token.provider = account.provider;
        token.userId = account.userId || user.id!;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      if (!session.user?.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
      });

      if (!dbUser) {
        session.user.isDeleted = true;
        return session;
      }

      session.user.coins = dbUser.coins || 0;

      session.user.provider = token.provider as SessionProvider;
      session.user.id = token.userId as string;
      session.user.username = dbUser.username!;
      delete (session.user as any).name;

      if (!session.user.username) {
        const userUniqueId = getUniqueId();
        const username = "guest_" + userUniqueId;

        const update = await prisma.user.update({
          where: {
            email: session.user.email,
          },
          data: {
            username,
            premium: {
              picsCountOnPage: 8,
              adminPostsOff: false,
              commentsPicsGifsOff: false,
              hideNegativeComments: false,
              hideAds: true,
              hideProfile: false,
              hidePremiumIcon: false,
              hideLowReputationComments: false,
            },
            notifications: {
              newOrders: true,
              newMarks: true,
              commentsOnHomePage: true,
              newComments: true,
            },
          },
        });

        if (!update) return session;
      }

      return session;
    },
  },
});
