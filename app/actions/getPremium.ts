import prisma from "../libs/prismadb";
import { getSession } from "./getSession";

export const revalidate = 0;

export async function getPremium() {
  const session = await getSession();

  if (!session?.user?.email) return null;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
      select: {
        premium: true,
        premiumExpires: true,
      },
    });

    const premiumExpireDate = user?.premiumExpires
      ? user.premiumExpires.getTime()
      : null;
    const currentDate = new Date().getTime();

    const isPremium = premiumExpireDate
      ? premiumExpireDate > currentDate
      : false;

    return {
      isPremium,
      premium: isPremium ? user.premium : {},
    };
  } catch (err: any) {
    return null;
  }
}
