"use server";

import { getSession } from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import formDataToObject from "@/utils/formDataToObject";
import { CategoryAction } from "@prisma/client";

export async function setCategoryAction(formData: FormData) {
  const session = await getSession();

  if (!session?.user?.email)
    return { message: "Wystąpił problem przy wykonywaniu zapytania!" };

  try {
    const data = formDataToObject(formData) as unknown as {
      id: string;
      method: "FOLLOW" | "BLOCK";
    };

    if (!["BLOCK", "FOLLOW"].includes(data.method))
      return { message: "Użyta metoda nie istnieje!" };

    const isActioned = await prisma.categoryAction.findFirst({
      where: {
        categoryId: data.id,
        authorId: session.user.id,
      },
    });

    if (isActioned) {
      await prisma.categoryAction.delete({
        where: {
          id: isActioned.id,
        },
      });
    }

    if ((isActioned as unknown as CategoryAction)?.method !== data.method) {
      const categoryAction = await prisma.categoryAction.create({
        data: {
          method: data.method,
          category: {
            connect: {
              id: data.id,
            },
          },
          author: { connect: { id: session.user.id } },
        },
      });
      return { method: categoryAction.method };
    }

    return { method: "" };
  } catch (err: any) {
    return null;
  }
}
