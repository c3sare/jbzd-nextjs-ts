import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import getUniqueId from "@/utils/getUniqueId";
import { PrismaClient } from "@prisma/client";

type SessionProvider = "credentials" | "google" | "facebook";

const prisma = new PrismaClient();

export default {
  providers: [],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/logowanie",
    signOut: "/api/auth/signout",
    error: "/logowanie",
    newUser: "/",
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user && account) {
        token.provider = account.provider;
        token.userId = account.userId || user.id;
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
} satisfies NextAuthConfig;
