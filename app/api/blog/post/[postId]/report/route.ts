import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

type ReportBlogPostParams = {
  params: Promise<{
    postId: string;
  }>;
};

export async function POST(
  request: NextRequest,
  { params }: ReportBlogPostParams
) {
  const { postId } = await params;
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No auth!", { status: 403 });

    const isReported = await prisma.reportedBlogPost.findUnique({
      where: {
        postId_authorId: {
          postId,
          authorId: session.user.id,
        },
      },
    });

    if (isReported)
      return NextResponse.json({ message: "Już raportowałeś ten wpis" });

    const report = await prisma.reportedBlogPost.create({
      data: {
        postId,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(report);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
