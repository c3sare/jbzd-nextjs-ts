import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { ActionedBlogTag, BlogTag } from "@prisma/client";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const { method } = await request.json();

    if (!method || !["BLOCK", "FOLLOW"].includes(method))
      return new NextResponse("Bad params", { status: 400 });

    const session = await getSession();

    if (!session?.user) return new NextResponse("No auth", { status: 403 });

    const tag = await prisma.blogTag.findUniqueOrThrow({
      where: {
        slug,
      },
    });

    const isExist = await prisma.actionedBlogTag.findFirst({
      where: {
        tag: {
          slug,
        },
      },
    });

    let action: ActionedBlogTag & {
      tag: Pick<BlogTag, "id" | "name" | "slug">;
    };

    if (isExist && method === isExist.method)
      action = await prisma.actionedBlogTag.delete({
        where: {
          id: isExist.id,
        },
        include: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
              _count: true,
            },
          },
        },
      });
    else
      action = await prisma.actionedBlogTag.upsert({
        where: {
          userId_tagId: {
            userId: session.user.id,
            tagId: tag.id,
          },
        },
        update: {
          method,
        },
        create: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          tag: {
            connect: {
              id: tag.id,
            },
          },
          method,
        },
        include: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true,
              _count: true,
            },
          },
        },
      });

    return NextResponse.json({
      action,
      isDeleted: isExist && method === isExist.method,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
