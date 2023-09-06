import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

type RequestParams = {
  params: {
    postId: string;
  };
};

export async function POST(
  request: Request,
  { params: { postId } }: RequestParams
) {
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
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
