import { getSession } from "@/app/actions/getSession";
import CreatePostSchema from "@/app/formSchemas/CreatePostSchema";
import prisma from "@/app/libs/prismadb";
import formDataToObject from "@/utils/formDataToObject";
import getLinkPreview from "monu-linkpreview";
import { NextResponse } from "next/server";
import { LinkInformation, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import uploadMemFile from "@/utils/uploadMemFile";
import createSlugFromTitle from "@/utils/createSlugFromTitle";

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
    else {
      data.tags = [];
    }

    const form = CreatePostSchema.parse(data);

    ////  TITLE ////////////////////////////////////////////////////
    const title = String(form.title);

    ////  CATEGORY /////////////////////////////////////////////////
    const selectedCategory = await prisma.category.findUnique({
      where: {
        slug: form.category,
      },
    });

    if (!selectedCategory)
      return new NextResponse("No category", { status: 400 });

    const categoryId = selectedCategory.id;

    ////  TAGS /////////////////////////////////////////////////////

    const tags: Prisma.PostCreateArgs<DefaultArgs>["data"]["tags"] = {
      connectOrCreate: form.tags.map((tag) => {
        const tagSlug = createSlugFromTitle(tag.value);

        return {
          create: {
            name: tag.value,
            slug: tagSlug,
          },
          where: {
            slug: tagSlug,
          },
        };
      }),
    };

    ////  UPLOAD MEM CONTAINERS ////////////////////////////////////
    const uploadTypes = ["IMAGE", "VIDEO"];

    const memContainers = await Promise.all(
      form.memContainers.map(async (item) => {
        if (uploadTypes.includes(item.type)) {
          item.data = await uploadMemFile(item.data);
        }

        return {
          type: item.type,
          data: item.data,
        };
      })
    );

    ////  LINKING //////////////////////////////////////////////////
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

    ////  SLUG  ////////////////////////////////////////////////////
    const slug = createSlugFromTitle(form.title);

    ////  CREATE POST IN DB ////////////////////////////////////////
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        categoryId,
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
