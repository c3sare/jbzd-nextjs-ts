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

import { getSession } from "@/app/actions/getSession";
import { CategoryAction } from "@prisma/client";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const { method, id }: { method: "BLOCK" | "FOLLOW"; id: string } =
      await request.json();

    if (!["BLOCK", "FOLLOW"].includes(method))
      return new NextResponse("Invalid method type", { status: 400 });

    const isActioned = await prisma.categoryAction.findFirst({
      where: {
        categoryId: id,
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

    if ((isActioned as unknown as CategoryAction)?.method !== method) {
      const categoryAction = await prisma.categoryAction.create({
        data: {
          method,
          category: {
            connect: {
              id,
            },
          },
          author: { connect: { id: session.user.id } },
        },
      });
      return NextResponse.json({ method: categoryAction.method });
    }

    return NextResponse.json({ method: "" });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
