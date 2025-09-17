import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

type RequestParams = {
  params: Promise<{
    postId: string;
  }>;
};

export async function POST(request: Request, { params }: RequestParams) {
  const { postId } = await params;
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  if (!postId) return new NextResponse("No id provided", { status: 400 });

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
      return NextResponse.json({ reported: Boolean(report) });
    } else {
      return NextResponse.json({ reported: false });
    }
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
