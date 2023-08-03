import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";

export const revalidate = 0;

export async function getUserPreferences() {
  const session = await getSession();

  if (!session?.user?.email) return null;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
      include: {
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

    return {
      followedCategories: user.followedCategories,
      actionedUsers: user.actionedUsers,
      actionedTags: user.actionedTags,
    };
  } catch (err: any) {
    return null;
  }
}
