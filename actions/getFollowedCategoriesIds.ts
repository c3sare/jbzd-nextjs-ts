import prisma from "@/libs/prismadb";
import { getSession } from "./getSession";

export default async function getFollowedCategoriesIds() {
  const session = await getSession();

  if (!session?.user?.id) return [];

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      actionedCategories: true,
    },
  });

  if (!user) return [];

  return user.actionedCategories
    .filter((item) => item.method === "FOLLOW")
    .map((item) => item.categoryId);
}
