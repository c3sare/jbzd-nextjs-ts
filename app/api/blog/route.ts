import formDataToObject from "@/utils/formDataToObject";
import BlogPostSchema from "@/validators/BlogPostSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = formDataToObject(formData);

    const parsed = BlogPostSchema.parse(data);

    console.log(parsed);

    return NextResponse.json({});
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
