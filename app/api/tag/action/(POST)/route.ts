import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { TagAction } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const { method, id }: { method: "BLOCK" | "FOLLOW"; id: string } =
      await request.json();

    if (!["BLOCK", "FOLLOW"].includes(method))
      return new NextResponse("Invalid method type", { status: 400 });

    const isActioned = await prisma.tagAction.findFirst({
      where: {
        tagId: id,
        authorId: session.user.id,
      },
    });

    if (isActioned) {
      await prisma.tagAction.delete({
        where: {
          id: isActioned.id,
        },
      });
    }

    if ((isActioned as unknown as TagAction)?.method !== method) {
      const tagAction = await prisma.tagAction.create({
        data: {
          method,
          tag: {
            connect: {
              id,
            },
          },
          author: { connect: { id: session.user.id } },
        },
      });
      return NextResponse.json({ method: tagAction.method });
    }

    return NextResponse.json({ method: "" });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
