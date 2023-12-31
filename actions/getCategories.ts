import { getSession } from "./getSession";
import prisma from "@/libs/prismadb";

export async function getCategories() {
  const session = await getSession();

  const isLoggedIn = Boolean(session?.user?.email);

  const categories = await prisma.category.findMany({
    where: {
      parentId: {
        isSet: false,
      },
    },
    include: {
      children: true,
    },
  });

  if (isLoggedIn) {
    return categories;
  } else {
    return categories.filter((item) => !item.nsfw);
  }
}
