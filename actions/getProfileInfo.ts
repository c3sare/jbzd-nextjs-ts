import { getSession } from "./getSession";
import prisma from "@/libs/prismadb";

export async function getProfileInfo() {
  try {
    const session = await getSession();

    if (!session?.user?.username) {
      return null;
    }

    const user = await prisma.userProfileInfo.findFirst({
      where: {
        username: session?.user?.username,
      },
    });

    if (!user) return null;

    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
