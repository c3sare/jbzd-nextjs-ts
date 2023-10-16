import { getSession } from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user)
      return new NextResponse("User from session not found", { status: 404 });

    return NextResponse.json({
      avatar: user.image,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("No authorization", { status: 403 });

    const body = await request.json();

    const { avatar } = body;

    const base64RegExp =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
    const isBase64 = (str: string) => base64RegExp.test(str);

    const isValidBase64 = isBase64(
      avatar.replace("data:image/png;base64,", "")
    );

    if (!avatar || !isValidBase64)
      return new NextResponse("Internal Error", { status: 500 });

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    cloudinary.config({
      secure: true,
    });

    const options: UploadApiOptions = {
      unique_filename: true,
      overwrite: true,
      folder: "upload/avatars",
    };

    const result = await cloudinary.uploader.upload(avatar, options);

    const update = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: result.secure_url,
      },
    });

    if (user?.image && user.image.indexOf("res.cloudinary.com") > -1) {
      const url = user.image;
      const id = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
      cloudinary.uploader.destroy(options.folder + "/" + id, {});
    }

    if (!update) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json({
      avatar: result.secure_url,
    });
  } catch (err: any) {
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
