import { getSession } from "@/app/actions/getSession";
import CreatePostSchema from "@/app/formSchemas/CreatePostSchema";
import prisma from "@/app/libs/prismadb";
import formDataToObject from "@/utils/formDataToObject";
import getLinkPreview from "monu-linkpreview";
import { NextResponse } from "next/server";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import { uploadStream } from "@/utils/uploadStream";
import { LinkInformation, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email)
    return new NextResponse("No authorization", { status: 403 });

  try {
    const formData = await request.formData();
    const data: any = formDataToObject(formData);
    data.title = String(data.title);

    if (data.tags)
      data.tags.forEach((item: any) => {
        item.value = String(item.value);
      });

    const form = CreatePostSchema.parse(data);

    const selectedCategory = await prisma.category.findUnique({
      where: {
        slug: form.category,
      },
    });

    cloudinary.config({
      secure: true,
    });

    const dataTypes: any = {
      image: "images",
      video: "videos",
    };

    const memContainers = await Promise.all(
      form.memContainers.map(async (item) => {
        if (["IMAGE", "VIDEO"].includes(item.type)) {
          const fileTypeExt = item.data.type;

          const fileType = fileTypeExt.split("/")[0];

          const format = fileTypeExt === "image/gif" ? "mp4" : undefined;
          const isVideo = fileType === "video";
          const resource_type = isVideo ? "video" : undefined;

          const options: UploadApiOptions = {
            resource_type,
            unique_filename: true,
            overwrite: false,
            format,
            folder: "upload/" + dataTypes[fileType],
          };

          const fileArrayBuffer = await (item.data as File).arrayBuffer();
          const fileBuffer = Buffer.from(fileArrayBuffer);

          const result = await uploadStream(fileBuffer, options);

          item.data = result.secure_url;
        }

        return {
          type: item.type,
          data: item.data,
        };
      })
    );

    if (!selectedCategory)
      return new NextResponse("No category", { status: 400 });

    let link: LinkInformation | undefined;

    if (form.linking.isActive && form.linking.url) {
      const data = await getLinkPreview(form.linking.url);
      link = {
        description: data.description || "",
        domain: data.domain || "",
        img: data.img || "",
        origin: data.origin || "",
        title: data.title || "",
      };
    }

    const tags: Prisma.PostCreateArgs<DefaultArgs>["data"]["tags"] = {
      connectOrCreate: form.tags.map((tag) => ({
        create: {
          name: tag.value,
        },
        where: {
          name: tag.value,
        },
      })),
    };

    const post = await prisma.post.create({
      data: {
        title: String(form.title),
        categoryId: selectedCategory.id,
        authorId: session.user.id,
        memContainers,
        tags,
        link,
      },
    });

    return NextResponse.json(JSON.parse(JSON.stringify(post)));
  } catch (err: any) {
    console.log(err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
