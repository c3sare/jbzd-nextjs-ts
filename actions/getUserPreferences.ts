import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

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
        actionedCategories: {
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
      actionedCategories: user.actionedCategories,
      actionedUsers: user.actionedUsers,
      actionedTags: user.actionedTags,
    };
  } catch (err: any) {
    return null;
  }
}
