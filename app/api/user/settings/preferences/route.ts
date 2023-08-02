import { getSession } from "@/app/actions/getSession";
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
        followedCategories: {
          include: {
            category: true,
          },
        },
        actionedUsers: {
          include: {
            user: {
              select: {
                username: true,
                id: true,
              },
            },
          },
        },
        actionedTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    throw new NextResponse("Internal Error " + err, { status: 500 });
  }
}
