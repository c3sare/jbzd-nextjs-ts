import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

export async function getCurrentUserBlogData() {
  try {
    const session = await getSession();

    const userId = session?.user?.id;

    if (!userId) return null;

    const observedPosts = await prisma.observedBlogPost.findMany({
      where: {
        userId,
      },
    });

    const votedPosts = await prisma.blogPostVote.findMany({
      where: {
        userId,
      },
    });

    const actionedTags = await prisma.actionedBlogTag.findMany({
      where: {
        userId,
      },
    });

    return {
      observedPosts,
      votedPosts,
      actionedTags,
      session: session.user!,
    };
  } catch (err) {
    return null;
  }
}
