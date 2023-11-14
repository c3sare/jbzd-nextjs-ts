import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

export async function getTagActions() {
  try {
    const session = await getSession();

    const userId = session?.user?.id;

    if (!userId) return null;

    const actionedTags = await prisma.actionedBlogTag.findMany({
      where: {
        userId,
      },
      include: {
        tag: {
          select: {
            id: true,
            name: true,
            slug: true,
            _count: {
              select: {
                posts: true,
              },
            },
          },
        },
      },
    });

    return {
      actionedTags,
      session: session.user!,
    };
  } catch (err) {
    return null;
  }
}
