import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

export default async function getProfileInfo() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.userProfileInfo.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) return null;

    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
