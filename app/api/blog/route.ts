import formDataToObject from "@/utils/formDataToObject";
import BlogPostSchema from "@/validators/BlogPostSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import uploadMemFile from "@/utils/uploadMemFile";
import { auth } from "@/auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) return new NextResponse("No auth", { status: 403 });

    const formData = await req.formData();
    const data = formDataToObject(formData);
    console.log(data);

    const {
      message,
      files,
      adultContent,
      questionnaire: survey,
    } = BlogPostSchema.parse(data);

    const uploadFiles = await Promise.all(
      files.map(async (file) => {
        const url = await uploadMemFile(file.value);

        return {
          id: file.uuid,
          type: file.type,
          url,
        };
      })
    );

    const availableTo = new Date();

    if (survey?.availableTime === "1d") {
      availableTo.setDate(availableTo.getDate() + 1);
    } else if (survey?.availableTime === "3d") {
      availableTo.setDate(availableTo.getDate() + 3);
    } else if (survey?.availableTime === "7d") {
      availableTo.setDate(availableTo.getDate() + 7);
    }

    const questionnaire = survey?.question
      ? {
          create: {
            title: survey.question,
            answers: survey.answers.map((answer, i) => ({
              id: i + 1,
              title: answer.value,
            })),
            markOption: survey.markOption,
            availableTo: survey.availableTime ? availableTo : undefined,
          },
        }
      : undefined;

    const blogPost = await prisma.blogPost.create({
      data: {
        text: message,
        files: uploadFiles,
        adultContent,
        questionnaire: survey?.question
          ? {
              create: {
                title: survey.question,
                answers: survey.answers.map((answer, i) => ({
                  id: i + 1,
                  title: answer.value,
                })),
                markOption: survey.markOption,
                availableTo: survey.availableTime ? availableTo : undefined,
              },
            }
          : undefined,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(blogPost);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
