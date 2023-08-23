import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";
import getUniqueId from "@/app/libs/getUniqueId";

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

      session.user.provider = token.provider as
        | "credentials"
        | "google"
        | "facebook";
      session.user.id = token.userId;
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
  pages: {
    signIn: "/logowanie",
    signOut: "/api/auth/signout",
    error: "/logowanie",
    newUser: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
