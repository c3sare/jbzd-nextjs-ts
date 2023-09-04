import { getSession } from "./getSession";
import prisma from "@/app/libs/prismadb";

export async function getCategoryAction(id: string) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return "";
    }

    const action = await prisma.categoryAction.findFirst({
      where: {
        authorId: session.user.id,
        categoryId: id,
      },
    });

    if (!action) return "";

    return action.method;
  } catch (err: any) {
    console.log(err);
    return "";
  }
}
