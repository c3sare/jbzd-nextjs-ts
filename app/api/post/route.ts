import { getSession } from "@/app/actions/getSession";
import { NextResponse } from "next/server";
import getLinkPreview from "monu-linkpreview";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const obj: any = {};
    const data = await request.formData();
    data.forEach((item) => console.log(item));
    return NextResponse.json({});
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
