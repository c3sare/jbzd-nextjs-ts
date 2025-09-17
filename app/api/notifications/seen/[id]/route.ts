import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

type NotifiPostProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, { params }: NotifiPostProps) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user?.id || !id)
      return new NextResponse("No authorization", { status: 500 });

    const notification = await prisma.notification.update({
      where: {
        id,
        userId: session.user.id,
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
