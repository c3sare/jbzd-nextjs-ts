import prisma from "@/app/libs/prismadb";
import { getSession } from "./getSession";

export default async function getFollowedCategoriesIds() {
  const session = await getSession();

  if (!session?.user?.id) return [];

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      followedCategories: true,
    },
  });

  if (!user) return [];

  return user.followedCategories.map((item) => item.categoryId);
}
