import { getSession } from "@/actions/getSession";
import { NextResponse } from "next/server";
import getLinkPreview from "monu-linkpreview";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  const { url } = await request.json();

  try {
    const previewData = await getLinkPreview(url as string);

    return NextResponse.json(previewData);
  } catch {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
