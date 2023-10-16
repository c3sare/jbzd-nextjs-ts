import { getSession } from "@/app/actions/getSession";
import UserNotificationsSchema from "@/app/validators/UserSettings/UserNotificationsSchema";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: session.user.email,
      },
      select: {
        notifications: true,
      },
    });

    return NextResponse.json(user.notifications);
  } catch (err: any) {
    throw new NextResponse("Internal Error " + err, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const body = await request.json();

    const notifications = UserNotificationsSchema.parse(body);

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        notifications,
      },
    });

    return NextResponse.json(user.notifications);
  } catch (err: any) {
    throw new NextResponse("Internal Error " + err, { status: 500 });
  }
}
