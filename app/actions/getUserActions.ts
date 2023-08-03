import { getSession } from "./getSession";
import prisma from "@/app/libs/prismadb";

export const revalidate = 0;

export async function getUserActions() {
  try {
    const session = await getSession();

    if (!session?.user?.username) {
      return null;
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        followedCategories: {
          include: {
            category: true,
          },
        },
        actionedUsers: {
          include: {
            user: {
              select: {
                username: true,
                id: true,
              },
            },
          },
        },
        actionedTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!user) return null;

    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
