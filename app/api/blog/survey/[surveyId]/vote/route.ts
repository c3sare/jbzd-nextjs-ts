import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getSession } from "@/actions/getSession";

type Params = {
  params: Promise<{
    surveyId: string;
  }>;
};

export async function POST(req: NextRequest, { params }: Params) {
  const { surveyId: questionnaireId } = await params;

  try {
    const session = await getSession();

    if (!session?.user) return new NextResponse("No auth", { status: 403 });

    const { id } = await req.json();

    if (!id || typeof id !== "number" || id < 1)
      return new NextResponse("Bad params", { status: 400 });

    const questionnaire = await prisma.questionnaire.findUnique({
      where: {
        id: questionnaireId,
      },
    });

    if (!questionnaire)
      return new NextResponse("No questionnaire", { status: 404 });

    if (
      questionnaire.availableTo !== null &&
      questionnaire.availableTo < new Date()
    )
      return new NextResponse("Questionnaire has been already ended!", {
        status: 400,
      });

    if (questionnaire.markOption === "single") {
      const currentVote = await prisma.questionnaireVote.findFirst({
        where: {
          questionnaireId,
          authorId: session.user.id,
        },
      });

      if (currentVote) {
        await prisma.questionnaireVote.delete({
          where: {
            id: currentVote.id,
          },
        });

        if (currentVote.answerId === id) {
          const markedIds = await prisma.questionnaireVote.findMany({
            where: {
              questionnaireId,
              authorId: session.user.id,
            },
          });

          const votes = await prisma.questionnaireVote.findMany({
            where: {
              questionnaireId,
            },
          });

          return NextResponse.json({
            markedIds: markedIds.map((item) => item.answerId),
            votes,
          });
        }
      }

      await prisma.questionnaireVote.create({
        data: {
          questionnaire: {
            connect: {
              id: questionnaireId,
            },
          },
          author: {
            connect: {
              id: session.user.id,
            },
          },
          answerId: id,
        },
      });

      const markedIds = await prisma.questionnaireVote.findMany({
        where: {
          questionnaireId,
          authorId: session.user.id,
        },
      });

      const votes = await prisma.questionnaireVote.findMany({
        where: {
          questionnaireId,
        },
      });

      return NextResponse.json({
        markedIds: markedIds.map((item) => item.answerId),
        votes,
      });
    } else {
      const deletedVotes = await prisma.questionnaireVote.deleteMany({
        where: {
          questionnaireId,
          authorId: session.user.id,
          answerId: id,
        },
      });

      if (deletedVotes.count) {
        const markedIds = await prisma.questionnaireVote.findMany({
          where: {
            questionnaireId,
            authorId: session.user.id,
          },
        });

        const votes = await prisma.questionnaireVote.findMany({
          where: {
            questionnaireId,
          },
        });

        return NextResponse.json({
          markedIds: markedIds.map((item) => item.answerId),
          votes,
        });
      }

      await prisma.questionnaireVote.create({
        data: {
          author: {
            connect: {
              id: session.user.id,
            },
          },
          questionnaire: {
            connect: {
              id: questionnaireId,
            },
          },
          answerId: id,
        },
      });

      const markedIds = await prisma.questionnaireVote.findMany({
        where: {
          questionnaireId,
          authorId: session.user.id,
        },
      });

      const votes = await prisma.questionnaireVote.findMany({
        where: {
          questionnaireId,
        },
      });

      return NextResponse.json({
        markedIds: markedIds.map((item) => item.answerId),
        votes,
      });
    }
  } catch {
    return new NextResponse("Internal error", { status: 500 });
  }
}
