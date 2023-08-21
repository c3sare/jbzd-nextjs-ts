import { getSession } from "@/app/actions/getSession";
import formDataToObject from "@/utils/formDataToObject";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    let obj: any = {};
    const formData = await request.formData();
    const data = formDataToObject(formData);
    console.log(data);
    return NextResponse.json(data);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
