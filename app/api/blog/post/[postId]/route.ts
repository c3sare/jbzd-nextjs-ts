import { getSession } from "@/actions/getSession";
import formDataToObject from "@/utils/formDataToObject";
import BlogCommentSchema from "@/validators/BlogCommentSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";
import uploadMemFile from "@/utils/uploadMemFile";
import createSlugFromTitle from "@/utils/createSlugFromTitle";

type BlogPostParams = {
  params: Promise<{
    postId: string;
  }>;
};

const tagRegex = /#([a-zA-Z0-9]){3,32}/gim;

export async function PUT(request: NextRequest, { params }: BlogPostParams) {
  const { postId } = await params;

  if (!postId) return new NextResponse("No postId", { status: 400 });

  try {
    const session = await getSession();

    if (!session?.user?.id) return new NextResponse("No auth", { status: 403 });

    const formData = await request.formData();

    const { message, files } = BlogCommentSchema.parse(
      formDataToObject(formData)
    );

    let blogPostCreate: Prisma.BlogPostCreateInput = {
      text: message,
      adultContent: false,
      slug: createSlugFromTitle(message),
      author: {
        connect: {
          id: session.user.id,
        },
      },
    };

    if (files !== null && files.length)
      blogPostCreate.files = await Promise.all(
        files.map(async (file) => {
          const url = await uploadMemFile(file.value);

          return {
            id: file.uuid,
            type: file.type,
            url,
          };
        })
      );

    const comment = await prisma.blogPost.create({
      data: {
        ...blogPostCreate,
        parent: {
          connect: {
            id: postId,
          },
        },
      },
    });

    const tags = message.match(tagRegex);

    if (tags) {
      await prisma.$transaction(
        tags.map((tag) => {
          const name = tag.slice(1);
          const slug = createSlugFromTitle(name);
          return prisma.blogTag.upsert({
            where: {
              slug,
            },
            create: {
              slug,
              name,
              posts: {
                connect: {
                  id: comment.id,
                },
              },
            },
            update: {
              posts: {
                connect: {
                  id: comment.id,
                },
              },
            },
          });
        })
      );
    }

    return NextResponse.json(comment);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
