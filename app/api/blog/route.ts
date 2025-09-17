import formDataToObject from "@/utils/formDataToObject";
import BlogPostSchema from "@/validators/BlogPostSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import uploadMemFile from "@/utils/uploadMemFile";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import createSlugFromTitle from "@/utils/createSlugFromTitle";

const tagRegex = /#([a-zA-Z0-9]){3,32}/gim;

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) return new NextResponse("No auth", { status: 403 });

    const formData = await req.formData();
    const data = formDataToObject(formData);

    const { message, files, adultContent, questionnaire } =
      BlogPostSchema.parse(data);

    const blogPostCreate: Prisma.BlogPostCreateInput = {
      text: message,
      adultContent,
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

    if (questionnaire) {
      const { question, answers, markOption, availableTime } = questionnaire;
      blogPostCreate.questionnaire = {
        create: {
          title: question,
          answers: answers.map((answer, i) => ({
            id: i + 1,
            title: answer.value,
          })),
          markOption,
        },
      };

      if (availableTime !== "") {
        const days = Number(availableTime.slice(0, 1));

        const date = new Date();
        date.setDate(date.getDate() + days);

        blogPostCreate.questionnaire.create!.availableTo = date;
      }
    }

    const blogPost = await prisma.blogPost.create({
      data: blogPostCreate,
    });

    const tags = message.match(tagRegex);

    if (tags) {
      await Promise.all(
        tags.map(async (tag) => {
          const name = tag.slice(1);
          const slug = createSlugFromTitle(name);
          return await prisma.blogTag.upsert({
            where: {
              slug,
            },
            create: {
              slug,
              name,
              posts: {
                connect: {
                  id: blogPost.id,
                },
              },
            },
            update: {
              posts: {
                connect: {
                  id: blogPost.id,
                },
              },
            },
          });
        })
      );
    }

    return NextResponse.json(blogPost);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
