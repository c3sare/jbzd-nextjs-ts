import { getSession } from "./getSession";
import prisma from "@/app/libs/prismadb";

export default async function getFavouritePostsIds() {
  const session = await getSession();

  if (!session?.user?.id) return [];

  const favourite = await prisma.favouritePost.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  return favourite.map((item) => item.postId);
}
