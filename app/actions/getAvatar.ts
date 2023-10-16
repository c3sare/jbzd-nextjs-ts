import prisma from "../libs/prismadb";
import { getSession } from "./getSession";

export async function getAvatar() {
  const session = await getSession();

  const defaultAvatar = "/images/avatars/default.jpg";

  if (!session?.user?.email) return defaultAvatar;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) return defaultAvatar;

    return user.image;
  } catch (err: any) {
    return defaultAvatar;
  }
}
