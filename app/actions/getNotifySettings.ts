import prisma from "../libs/prismadb";
import { getSession } from "./getSession";

export async function getNotifySettings() {
  const session = await getSession();

  if (!session?.user?.email) return null;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
      select: {
        notifications: true,
      },
    });

    return user.notifications;
  } catch (err: any) {
    return null;
  }
}
