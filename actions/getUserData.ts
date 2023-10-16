import prisma from "@/libs/prismadb";
import { getSession } from "./getSession";

export const getUserData = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return {
      name: user?.name || "",
      gender: user?.gender || 0,
      country: user?.country || "",
      city: user?.city || "",
      birthdate: user?.birthdate?.toISOString() || null,
    };
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
