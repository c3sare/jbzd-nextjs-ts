import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { method } = await req.json();

  if (!method || !["PLUS", "MINUS"].includes(method))
    return new NextResponse("Internal error", { status: 400 });

  return NextResponse.json({});
}
