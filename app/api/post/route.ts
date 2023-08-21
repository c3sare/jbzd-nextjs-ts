import { getSession } from "@/app/actions/getSession";
import CreatePostSchema from "@/app/formSchemas/CreatePostSchema";
import prisma from "@/app/libs/prismadb";
import formDataToObject from "@/utils/formDataToObject";
import getLinkPreview from "monu-linkpreview";
import { NextResponse } from "next/server";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";

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

    const {
      title,
      memContainers,
      category,
      tags,
      isActiveLinking,
      link: linkInformations,
      customPreviewImage,
    } = CreatePostSchema.parse(data);

    const selectedCategory = await prisma.category.findUnique({
      where: {
        slug: category,
      },
    });

    if (!selectedCategory)
      return new NextResponse("No category", { status: 400 });

    const link =
      isActiveLinking && linkInformations
        ? await getLinkPreview(linkInformations as string)
        : null;

    cloudinary.config({
      secure: true,
    });

    const options: UploadApiOptions = {
      unique_filename: true,
      overwrite: true,
      folder: "upload/avatars",
    };

    let linkImage = null;

    if (customPreviewImage) {
      console.log((customPreviewImage as any).filepath);
      // const upload = await cloudinary.uploader.upload(
      //   (customPreviewImage as unknown as FileList)[0].webkitRelativePath,
      //   options
      // );
      // linkImage = upload.secure_url;
      // const upload = cloudinary.uploader.upload_stream({ format: 'jpg' }, (err, res) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(`Upload succeed: ${res}`);
      //     // filteredBody.photo = result.url;
      //   }
      // }).end(customPreviewImage);
    }

    const post = await prisma.post.create({
      data: {
        title: String(title),
        categoryId: selectedCategory.id,
        authorId: session.user.id,
        memContainers: memContainers.map((item) => ({
          type: item.type,
          data: item.data as string,
        })),
        tags: {
          connectOrCreate: tags.map((tag) => ({
            create: {
              name: tag.value,
            },
            where: {
              name: tag.value,
            },
          })),
        },
        ...(link ? { link } : {}),
        ...(linkImage ? { linkImage } : {}),
      },
    });

    return NextResponse.json(post);
  } catch (err: any) {
    console.log(err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
