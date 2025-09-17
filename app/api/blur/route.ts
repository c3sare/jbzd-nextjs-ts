import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function GET(request: NextRequest) {
  try {
    const req = await fetch(
      decodeURIComponent(request.nextUrl.searchParams.get("url") as string)
    );

    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const file = await getPlaiceholder(buffer);
    return new NextResponse(file.base64);
  } catch {
    return new NextResponse("Internal error", { status: 500 });
  }
}
