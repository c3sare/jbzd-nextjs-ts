"use server";
import prisma from "@/libs/prismadb";

export async function deleteTagAction(id: string) {
  const action = await prisma.actionedBlogTag.delete({
    where: {
      id,
    },
  });

  return action;
}
