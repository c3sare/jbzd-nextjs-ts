import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: { isSet: false },
        OR: [{ nsfw: false }, { nsfw: { isSet: false } }],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
