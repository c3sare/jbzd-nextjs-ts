"use server";

import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";

export default async function createPostReport(postId: string) {
  const session = await getSession();

  if (!session?.user?.email) return { message: "Nie jesteś zalogowany!" };

  if (!postId) return { message: "Takie id nie istnieje!" };

  try {
    const reportExist = await prisma.report.count({
      where: {
        postId,
        reporterId: session.user.id,
      },
    });

    if (reportExist === 0) {
      const report = await prisma.report.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          reporter: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
      return { reported: Boolean(report) };
    } else {
      return { reported: false };
    }
  } catch {
    return { message: "Wystąpił błąd!" };
  }
}
