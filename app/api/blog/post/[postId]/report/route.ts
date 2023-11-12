import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

type ReportBlogPostParams = {
  params: {
    postId: string;
  };
};

export async function POST(
  request: NextRequest,
  { params: { postId } }: ReportBlogPostParams
) {
  try {
    const session = await getSession();

    if (!session?.user?.id)
      return new NextResponse("No auth!", { status: 403 });

    try {
      const report = await prisma.reportedBlogPost.create({
        data: {
          postId,
          authorId: session.user.id,
        },
      });

      return NextResponse.json(report);
    } catch (err) {
      return NextResponse.json({ message: "Już raportowałeś ten wpis" });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
