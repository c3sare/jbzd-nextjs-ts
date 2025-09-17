import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";

type RequestParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: Request, { params }: RequestParams) {
  const { id } = await params;
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  if (!id) return new NextResponse("No id provided", { status: 400 });

  try {
    const youtube_data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=id&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
    ).then((data) => data.json());

    if (youtube_data?.items?.length > 0)
      return NextResponse.json({ videoExist: true });
    else return NextResponse.json({ videoExist: false });
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
