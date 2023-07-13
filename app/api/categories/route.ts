import getCategories from "@/app/actions/getCategories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await getCategories();

    return NextResponse.json(categories);
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
