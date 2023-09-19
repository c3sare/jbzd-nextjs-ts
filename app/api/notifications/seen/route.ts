import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST() {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No authorization", { status: 500 });

    const lastFiveNotifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        addTime: "desc",
      },
      take: 5,
    });

    const ids = lastFiveNotifications.map((notify) => notify.id);

    const notification = await prisma.notification.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        seen: true,
      },
    });

    return NextResponse.json(notification);
  } catch {
    return new NextResponse("Internal error", { status: 500 });
  }
}
